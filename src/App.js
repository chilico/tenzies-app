import React from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [dice, setDice] = React.useState(newDice())
    const [tenzies, setTenzies] = React.useState(false)
    React.useEffect(() => {
        dice.every((die) => die.isHeld) &&
        dice.every((die, _i, arr) => die.value === arr[0].value) &&
        setTenzies(true)
    }, [dice])

    function newDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            })
        }
        return newDice
    }

    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => (
                oldDice.map(die => (
                    die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
                ))
            ))
        } else {
            setTenzies(false)
            setDice(newDice())
        }
    }

    function holdDice(id) {
        setDice(oldDice => (
            oldDice.map(die => (
                die.id === id ? {...die, isHeld: !die.isHeld} : die
            ))
        ))
    }

    const diceElements = dice.map(die => (
        <Die
            key={die.id}
            id={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={holdDice}
        />
    ))

    return (
        <main>
            {tenzies && <Confetti />}
            <h2>Tenzies</h2>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="container">
                {diceElements}
            </div>
            <button onClick={rollDice} className="button">{tenzies ? "New Game" : "Roll"}</button>
        </main>
    )
}
