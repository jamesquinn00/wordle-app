import React, {useState, useEffect} from 'react';
import {AutoTabProvider} from 'react-auto-tab'

const InputRow = ( {checkGuess, row, activeRow, completed} ) => {
    
    const [disableRow, setDisableRow] = useState(true)

    function focusMethod(){
        const elem = document.getElementById(`${row}${1}`)
        elem.focus()
    }

    useEffect( ()=> {
        if(row === activeRow && !completed){
            setDisableRow(false)
            const myTimeout = setTimeout(focusMethod, 300);
        }
        else{
            setDisableRow(true)
        }
    },[activeRow])

    const checkSubmit = e => {
        if (e.keyCode === 13 && e.target.value) {
            let guess = ""
            for(let x = 0; x<5; x++){
                guess = guess + (e.target.parentElement.parentElement[x].value)
            }
            checkGuess(guess, row)
            if(checkGuess(guess, row)==="invalid"){
                setDisableRow(false)
                pulseRed()
            }
            else{
                setDisableRow(true)
            }
        }
      };

    function allowAlphabets(e){
        let textInput = e.target.value;
        textInput = textInput.replace(/[^A-Za-z ]*$/gm, ""); 
        textInput = textInput.toUpperCase()
        e.target.value = textInput;
    }

    function pulseRed(){
        for(let x=1; x<=5; x++){
            // document.getElementById(`${row}${parseInt(x)}`).style.backgroundColor="rgb(255 62 62)"
            document.getElementById(`${row}${parseInt(x)}`).style.backgroundColor="#f8544b"
        }
        const myTimeout = setTimeout(returnGrey, 480);
    }

    function returnGrey(){
        for(let x=1; x<=5; x++){
            document.getElementById(`${row}${parseInt(x)}`).style.backgroundColor="#dadada"
        }
    }

    return(
        <>
        <form autoComplete="off" name="inputRow" className="input-row">
            <AutoTabProvider>
                <input id={row+"1"} onInput={allowAlphabets} disabled={disableRow} className="input-box" type="text" maxLength={1} tabbable="true" />
                <input id={row+"2"} onInput={allowAlphabets} disabled={disableRow} className="input-box" type="text" maxLength={1} tabbable="true" />
                <input id={row+"3"} onInput={allowAlphabets} disabled={disableRow} className="input-box" type="text" maxLength={1} tabbable="true" />
                <input id={row+"4"} onInput={allowAlphabets} disabled={disableRow} className="input-box" type="text" maxLength={1} tabbable="true" />
                <input id={row+"5"} onInput={allowAlphabets} disabled={disableRow} className="input-box" type="text" maxLength={1} tabbable="true" onKeyUp={checkSubmit}/>
            </AutoTabProvider>
        </form>
        </>
    )
}

export default InputRow