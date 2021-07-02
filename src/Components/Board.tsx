import {Column} from "./Column"
import styled from "styled-components"
import React from "react"
import {ColumnType, StateType} from "../Redux/state"
import {useSelector} from "react-redux";

export function Board() {
    const columns = useSelector<StateType, Array<ColumnType>>(state => state.columns)

    return (
        <div>
            <Section>
                {columns.map((col) => (
                    <Column
                        title={col.title}
                        id={col.id}
                        key={col.id}
                        cards={col.cards}
                    />
                ))}
            </Section>
        </div>
    )
}

const Section = styled.div`
  display: flex;
  margin: 20px;
`