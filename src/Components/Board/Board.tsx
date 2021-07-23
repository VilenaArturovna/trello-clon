import {Column} from "../Column/index"
import styled from "styled-components"
import React from "react"
import {useSelector} from "react-redux";
import {getColumns} from "../../Redux/selectors";

export function Board() {
    const columns = useSelector(getColumns)
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
