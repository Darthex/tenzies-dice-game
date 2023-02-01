import React from 'react'
import Die from "./compoonents/Die.jsx";
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
export default function App() {

    const [state, setState] = React.useState(randomDiceNumber())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allHeld = state.every(die => die.isHeld===true)
        const firstValue = state[0].value
        const allSameValue = state.every(die => die.value===firstValue)
        if(allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [state])
    function randomDiceNumber() {
        const arr = []
        for(let i = 0; i < 10; i++) {
            arr[i] = {
                number: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }
        }
        return arr
    }
    function handleClick() {
        if(!tenzies) {
            setState(oldDice => oldDice.map(die => {
                return die.isHeld ? die : {
                    number: Math.ceil(Math.random() * 6),
                    isHeld: false,
                    id: nanoid()
                }
            }))
        } else {
            setTenzies(false)
            setState(randomDiceNumber())
        }
    }
    function holdDice(id) {
        setState(oldDice => oldDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }

    const diceElements = state.map(die => <Die key={die.id} id={die.id} value ={die.number} isHeld={die.isHeld} hold={holdDice}/>)

    return(
        <main className="white--square">
            {tenzies && <Confetti />}
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice--container">
                {diceElements}
            </div>
            <button className="roll--button" onClick={handleClick}>
                <h2>{tenzies ? "New Game" : "Roll"}</h2>
            </button>
        </main>
    )
}