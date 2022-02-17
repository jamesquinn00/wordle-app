import React, { useState, useEffect } from 'react'
import axios from 'axios'
import answerstxt from './answers.txt'
import InputRow from '../components/InputRow'

const MainPage = () => {

    const [answers, setAnswers] = useState([])
    const [answerWord, setAnswerWord] = useState("")
    const [loading, setLoading] = useState(true);
    const [rowsDone, setRowsDone] = useState(0)
    const [completed, setCompleted] = useState(false)
    const [plural, setPlural] = useState("")

    useEffect(async ()=>{
        await axios(answerstxt)
        .then(res => res.data.split("\\"))
        .then( res => {
            const answerIndex = Math.floor(Math.random() * 2317)
            const array = []
            for(let x in res){
                array.push(res[x].slice(-5))
            }
            setAnswers(array)
            setAnswerWord(array[answerIndex])}
            )
        .then(setLoading(false))
    },[])

    const checkGuess = (guess, row) => {
        console.log("GUESS RECIEVED: ", guess)
        // let answerArray = answers[answerIndex].split("")
        // let answer = answers[answerIndex]
        let answerArray = answerWord.split("")
        let answer = answerWord
        guess = guess.toUpperCase()
        let guessArray = guess.split("")
        let colours = ["","","","",""]
        let occurenceArray = {}
        let occurenceArrayFixed = {}
        for(let x in guess){
            const occurrences = answer.split(guess[x]).length-1
            occurenceArray[guess[x]]=occurrences
            occurenceArrayFixed[guess[x]]=occurrences
        }
        // console.log(occurenceArray)
        for(let x in guess){
            let occurenceX = occurenceArray[guess[x]]
            let fixedOccurrence = occurenceArrayFixed[guess[x]]
            let yellowGreenCount = 0
            let greenCount = 0
            if(guess[x]===answer[x]){
                colours[x]="G"
                // console.log("GREEN")
                yellowGreenCount++
                greenCount++
                occurenceArray[guess[x]]--
                if(occurenceX<=0){
                    for(let i in answer){
                        if(i!=x && guess[x]===guess[i] && colours[i]==="Y"){
                            // console.log("REMOVING YELLOW")
                            colours[i]=""
                            // occurenceArray[guess[x]]--
                        }
                    }
                }
            }
            else if(occurenceX>0){
                let yellowCount = 0
                // yellowGreenCount++
                yellowGreenCount++
                occurenceArray[guess[x]]--
                for(let i in answer){
                    if(i!=x && guess[x]===answer[i] && occurenceX>0){
                        // console.log("YELLOW")
                        colours[x]="Y"
                        yellowCount++
                        
                    }
                }
            }
        }

        for(let x in colours){
            if(colours[x]==="Y"){
                document.getElementById(`${row}${parseInt(x)+1}`).style.backgroundColor="#f2bc1b"
            }
            else if(colours[x]==="G"){
                document.getElementById(`${row}${parseInt(x)+1}`).style.backgroundColor="#49b449"
            }
            else if(colours[x]===""){
                document.getElementById(`${row}${parseInt(x)+1}`).style.backgroundColor="#bababa"
            }
        }
        // console.log(colours.join("").split("G").length-1)
        console.log(`${row+1}${1}`)
       
        if(colours[0]==="G" && colours.join("").split("G").length-1===5){
            setCompleted(true)
        }
        setRowsDone(rowsDone+1)
        if(rowsDone>1){
            setPlural("es")
        }
    }

    function refreshPage(e){
        window.location.reload()
    }

    return(
        <>
        {!loading ? <h3> {answerWord} </h3>: <p>Loading...</p>}
        <div className="flex-container">
            <div>
                <InputRow row={1} activeRow={rowsDone+1} completed={completed} checkGuess={checkGuess}/>
                <InputRow row={2} activeRow={rowsDone+1} completed={completed} checkGuess={checkGuess}/>
                <InputRow row={3} activeRow={rowsDone+1} completed={completed} checkGuess={checkGuess}/>
                <InputRow row={4} activeRow={rowsDone+1} completed={completed} checkGuess={checkGuess}/>
                <InputRow row={5} activeRow={rowsDone+1} completed={completed} checkGuess={checkGuess}/>
                <InputRow row={6} activeRow={rowsDone+1} completed={completed} checkGuess={checkGuess}/>
            </div>
        </div>
        {completed ? <div className="column-container"><h3>Completed in {rowsDone} guess{plural}!</h3><button id="refresh" onClick={refreshPage}>Refresh</button></div>: <> </>}
        </>
    )
}

export default MainPage