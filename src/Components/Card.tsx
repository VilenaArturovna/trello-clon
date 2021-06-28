import styled from "styled-components";
import {ChangeEvent, useState} from "react";

type CardType = {
    title: string
}

const Item = styled.div`
  text-align: start;
  padding-left: 10px;

`

export const Card = ({title}: CardType) => {

    const [cardTitle, setCardTitle] = useState<string>(title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = (e: ChangeEvent<HTMLInputElement>) => {
        setEditMode(false)
        setCardTitle(e.currentTarget.value)

    }
    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCardTitle(e.currentTarget.value)
    }

    return (
        <Item>
            {!editMode
                ? <span onClick={activateEditMode}>{cardTitle}</span>
                : <div><input onChange={onTitleChange} autoFocus={true} onBlur={deactivateEditMode}
                              value={cardTitle}/></div>
            }
        </Item>
    )
}