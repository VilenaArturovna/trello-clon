import {Column} from "./Column"
import styled from "styled-components"
import React, {useEffect} from "react"
import {fetchColumns} from "../Redux/main-reducer"
import {ColumnType, StateType} from "../Redux/state"
import {useDispatch, useSelector} from "react-redux";
import {board} from "../api/api";

export function Board() {
    const dispatch = useDispatch()
    const columns = useSelector<StateType, Array<ColumnType>>(state => state.columns)
    useEffect(() => {
        if (board) {
            const columns = JSON.parse(board).columns
            dispatch(fetchColumns({columns}))
        }
    }, [dispatch])

    return (
        <div>
            <Section>
                {columns.map((col) => (
                    <Column title={col.title} id={col.id} key={col.id} cards={col.cards}/>
                ))}
            </Section>
        </div>
    )
}

const Section = styled.div`
  display: flex;
  margin: 20px;
`