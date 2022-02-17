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
            console.log("here")
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
            setDisableRow(true)
        }
      };

    return(
        <>
        <form name="inputRow" className="input-row">
            <AutoTabProvider>
                <input id={row+"1"} disabled={disableRow} className="input-box" type="text" maxLength={1} tabbable="true" />
                <input id={row+"2"} disabled={disableRow} className="input-box" type="text" maxLength={1} tabbable="true" />
                <input id={row+"3"} disabled={disableRow} className="input-box" type="text" maxLength={1} tabbable="true" />
                <input id={row+"4"} disabled={disableRow} className="input-box" type="text" maxLength={1} tabbable="true" />
                <input id={row+"5"} disabled={disableRow} className="input-box" type="text" maxLength={1} tabbable="true" onKeyUp={checkSubmit}/>
            </AutoTabProvider>
        </form>
        </>
    )
}

export default InputRow