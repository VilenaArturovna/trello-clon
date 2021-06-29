import React, {useState} from 'react'
import './App.css'
import {Board} from "./Components/Board"
import {PopUp} from "./Components/PopUp"
import {localStorageEnum} from "./Reducers/state"

function App() {
    const [isOpen, setIsOpen] = useState(true)
    const name = localStorage.getItem(localStorageEnum.userName)
    const togglePopup = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div className="App">
            {isOpen && !name ? <PopUp handleClose={togglePopup}/> : < Board/>}
        </div>
    )
}

export default App
