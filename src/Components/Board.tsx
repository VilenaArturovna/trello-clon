import {Column} from "./Column"
import styled from "styled-components"
import React, {useEffect, useReducer} from "react"
import {mainReducer, fetchColumns, initialState, ActionsType} from "../Reducers/main-reducer"
import {localStorageEnum, StateType} from "../Reducers/state"

export const Board = () => {
    const [state, dispatch] = useReducer<React.Reducer<StateType, ActionsType>>(mainReducer, initialState)

    useEffect(() => {
        const data = localStorage.getItem(localStorageEnum.board)
        if (data) {
            const board: StateType = JSON.parse(data)
            dispatch(fetchColumns(board.columns))
        }
    }, [])

    return (
        <div>
            <Section>
                {state.columns.map(col => <Column title={col.title} id={col.id} key={col.id} cards={col.cards}/>)}
            </Section>
        </div>
    )
}

const Section = styled.div`
  display: flex;
  margin: 20px;
`