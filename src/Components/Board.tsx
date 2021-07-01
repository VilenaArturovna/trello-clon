import {Column} from "./Column"
import styled from "styled-components"
import React, {useEffect} from "react"
import {fetchColumns} from "../Redux/main-reducer"
import {ColumnType, localStorageEnum, StateType} from "../Redux/state"
import {useDispatch, useSelector} from "react-redux";

export function Board() {
    const dispatch = useDispatch()
    const columns = useSelector<StateType, Array<ColumnType>>(state => state.columns)
    useEffect(() => {
        const data = localStorage.getItem(localStorageEnum.board)
        if (data) {
            const board: StateType = JSON.parse(data)
            dispatch(fetchColumns(board.columns))
        }
    }, [dispatch])

    return (
        <div>
            <Section>
                {columns.map((col) => (
                    <Column title={col.title} id={col.id} key={col.id} cards={col.cards} />
                ))}
            </Section>
        </div>
    )
}

const Section = styled.div`
  display: flex;
  margin: 20px;
`