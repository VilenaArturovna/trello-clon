import React, {useEffect, useState} from 'react'
import {Board} from "./Components/Board"
import {PopUp} from "./Components/PopUp"
import {localStorageEnum, StateType} from "./Redux/state"
import {useSelector} from "react-redux";
import {userName} from "./api/api";

function App() {
    const [isOpen, setIsOpen] = useState(true)
    const togglePopup = () => {
        setIsOpen(!isOpen)
    }
    const state = useSelector<StateType, StateType>(state => state)

    useEffect(() => {
            localStorage.setItem(localStorageEnum.board, JSON.stringify(state))
    }, [state])
    return (
        <div>
            {isOpen && !userName ? (
                <PopUp handleClose={togglePopup}/>
            ) : (
                <Board/>
            )}
        </div>
    )
}

export default App
