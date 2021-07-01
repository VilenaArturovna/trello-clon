import React, {useState} from 'react'
import {Board} from "./Components/Board"
import {PopUp} from "./Components/PopUp"
import {localStorageEnum} from "./Redux/state"

function App() {
    const [isOpen, setIsOpen] = useState(true)
    const userName = localStorage.getItem(localStorageEnum.userName)
    const togglePopup = () => {
        setIsOpen(!isOpen)
    }
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
