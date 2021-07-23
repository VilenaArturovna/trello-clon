import React, {useState} from 'react'
import {Board} from "./Components/Board/index"
import {PopUp} from "./Components/PopUp/index"
import {StateType} from "./Redux/state"
import {useSelector} from "react-redux";

function App() {
    const [isOpen, setIsOpen] = useState(true)
    const togglePopup = () => {
        setIsOpen(!isOpen)
    }
    const userName = useSelector<StateType, string>(state => state.userName)
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
