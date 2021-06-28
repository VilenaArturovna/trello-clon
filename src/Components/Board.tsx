import {Column} from "./Column";
import styled from "styled-components";
import {useEffect, useReducer} from "react";
import {columnReducer, fetchColumns, initialStateOfColumn} from "../Reducers/column-reducer";

const Section = styled.div`
    display: flex;
`

export const Board = () => {
    const [columns, dispatch] = useReducer(columnReducer, initialStateOfColumn)

    useEffect(() => {

        dispatch(fetchColumns())
    }, [columns])

    return (
        <Section>
            {columns.map(col => <Column title={col.title} id={col.id} key={col.id} />)}
        </Section>
    )
}