import React, {useReducer, useState} from 'react'
import {Board} from "./Components/Board"
import {PopUp} from "./Components/PopUp"
import {ActionsType, Context, initialState, mainReducer} from './Reducers/main-reducer'
import {localStorageEnum, StateType} from "./Reducers/state"

function App() {
    const [isOpen, setIsOpen] = useState(true)
    const name = localStorage.getItem(localStorageEnum.userName)
    const togglePopup = () => {
        setIsOpen(!isOpen)
    }
    const [state, dispatch] = useReducer<React.Reducer<StateType, ActionsType>>(mainReducer, initialState)
    return (

            <div>
                {isOpen && !name ? (
                    <PopUp handleClose={togglePopup}/>
                ) : (
                    <Context.Provider value={{dispatch, state}}><Board/></Context.Provider>
                )}
            </div>

    )
}

export default App
