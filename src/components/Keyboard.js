import React, {useState, useEffect} from 'react';

const Keyboard = ( {keysGuessed} ) => {

    const firstRow = ["Q","W","E","R","T","Y","U","I","O","P"]
    const secondRow = ["A","S","D","F","G","H","J","K","L"]
    const thirdRow = ["Z","X","C","V","B","N","M"]

    for(let x in keysGuessed){
        console.log(x)
        console.log(document.querySelector(`#key${x}`).style.backgroundColor)
        if(keysGuessed[x]==="G" ){
            console.log("green found")
            document.querySelector(`#key${x}`).style.backgroundColor = "#49b449"
        }
        else if(keysGuessed[x]==="Y" && document.querySelector(`#key${x}`).style.backgroundColor != "rgb(73, 180, 73)"){
            document.querySelector(`#key${x}`).style.backgroundColor = "#f2bc1b"
        }
        else if(keysGuessed[x]==="" && document.querySelector(`#key${x}`).style.backgroundColor != "rgb(73, 180, 73)"){
            document.querySelector(`#key${x}`).style.backgroundColor = "#777777"
        }
    }

    return(
        <>
        <div className="column-container">
            <div className="letter-row first-row">
                {firstRow.map(x=><li key={"key"+x} id={"key"+x}>{x}</li>)}
            </div>
            <div className="letter-row second-row">
                {secondRow.map(x=><li key={"key"+x} id={"key"+x}>{x}</li>)}
            </div>
            <div className="letter-row third-row">
                {thirdRow.map(x=><li key={"key"+x} id={"key"+x}>{x}</li>)}
            </div>
        </div>
        
        </>
    )
}

export default Keyboard