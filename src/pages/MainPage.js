import React, { useState, useEffect } from 'react'
import axios from 'axios'
import answerstxt from './answers.txt'
import potentialstxt from './potentials.txt'
import InputRow from '../components/InputRow'
import Keyboard from '../components/Keyboard'

const MainPage = () => {

    const [answers, setAnswers] = useState([])
    const [potentials, setPotentials] = useState([])
    const [answerWord, setAnswerWord] = useState("")
    const [loading, setLoading] = useState(true);
    const [rowsDone, setRowsDone] = useState(0)
    const [completed, setCompleted] = useState(false)
    const [plural, setPlural] = useState("")

    const [keysGuessed, setKeysGuessed]=useState({})
    let keysObject = {}

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

        await axios(potentialstxt)
            .then(res => res.data.split("\n"))
            .then( res => setPotentials(res))
            .then(setLoading(false))
    },[])

    const checkGuess = (guess, row) => {
        let answerArray = answerWord.split("")
        let answer = answerWord
        if(!answers.includes(guess.toUpperCase()) && !potentials.includes(guess.toLowerCase())){
            return "invalid"
        }
        // let answer = "ALTER"
        // let answerArray = answer.split("")
        guess = guess.toUpperCase()
        let guessArray = guess.split("")
        let colours = ["","","","",""]
        let occurenceArray = {}
        let occurenceArrayFixed = {}
        let guessOccurenceArray={}
        for(let x in guess){
            const occurrences = answer.split(guess[x]).length-1
            const guessOccurrences = guess.split(guess[x]).length-1
            occurenceArray[guess[x]]=occurrences
            occurenceArrayFixed[guess[x]]=occurrences
            guessOccurenceArray[guess[x]]=guessOccurrences
        }
        // console.log(occurenceArray)
        for(let x in guess){
            let currentLetter = guess[x]
            let occurenceX = occurenceArray[guess[x]]
            let fixedOccurrence = occurenceArrayFixed[guess[x]]
            let yellowGreenCount = 0
            let greenCount = 0
            // console.log(occurenceX)
            if(guess[x]===answer[x]){
                colours[x]="G"
                // console.log("GREEN")
                yellowGreenCount++
                greenCount++
                occurenceArray[guess[x]]--
                keysObject[guess[x]]="G"
                if(occurenceX<=0){
                    console.log("here")
                    let yellowsToRemove = guessOccurenceArray[guess[x]]-fixedOccurrence
                    // console.log(yellowsToRemove)
                    for(let i in answer){
                        if(i!=x && guess[x]===guess[i] && colours[i]==="Y" && yellowsToRemove>0){
                            // console.log("REMOVING YELLOW")
                            colours[i]=""
                            yellowsToRemove--
                        }
                    }
                }
            }
            else if(occurenceX>0){
                let yellowCount = 0
                // yellowGreenCount++
                yellowGreenCount++
                occurenceArray[guess[x]]--
                keysObject[guess[x]]="Y"
                for(let i in answer){
                    if(i!=x && guess[x]===answer[i] && occurenceX>0){
                        // console.log("YELLOW")
                        colours[x]="Y"
                        yellowCount++
                        
                    }
                }
            }
            else{
                if(!keysObject[guess[x]]){
                    keysObject[guess[x]]=""
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
       
        if(colours[0]==="G" && colours.join("").split("G").length-1===5){
            setCompleted(true)
        }
        setRowsDone(rowsDone+1)
        if(rowsDone>=1){
            setPlural("es")
        }
        setKeysGuessed(keysObject)
    }

    function refreshPage(e){
        window.location.reload()
    }

    return(
        <>
        {/* {!loading ? <h3 className="title"> {answerWord} </h3>: <p>Loading...</p>} */}
        {/* {!loading ? <h3 className="title"> ALTER </h3>: <p>Loading...</p>} */}
        <h3 className="title">Wordle</h3>
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
        {rowsDone < 6 && !completed ? <Keyboard keysGuessed={keysGuessed}/> : <> </>}
        {completed ? <div className="column-container"><h3>Completed in {rowsDone} guess{plural}!</h3><button id="refresh" onClick={refreshPage}>Refresh</button></div>: <> </>}
        {rowsDone===6 && !completed ? <div className="column-container"><h3>No more guesses. The word was {answerWord}.</h3><button id="refresh" onClick={refreshPage}>Refresh</button></div>: <> </>}
        </>
    )
}

export default MainPage