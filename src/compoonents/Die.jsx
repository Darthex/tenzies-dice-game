import React from 'react'

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    function handleClick() {
        props.hold(props.id)
    }
    return(
        <div className="dice--face" onClick={handleClick} style={styles}>
            <h2 className="dice--number">{props.value}</h2>
        </div>
    )
}
