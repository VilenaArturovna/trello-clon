import styled from "styled-components";
import {ChangeEvent, useState} from "react";

type CardType = {
    title: string
}

const Item = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
  cursor: pointer;
  display: block;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 20px;
  position: relative;
  text-decoration: none;
  z-index: 0;
`
const ItemDetails = styled.div`
  overflow: hidden;
  padding: 6px 8px 2px;
  position: relative;
  z-index: 10;
`
const InputCardTitle = styled.input`
  width: 100%;
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
                ? <ItemDetails onClick={activateEditMode}>{cardTitle}</ItemDetails>
                : <div>
                    <InputCardTitle onChange={onTitleChange} autoFocus={true} onBlur={deactivateEditMode}
                                    value={cardTitle}/>
                </div>
            }
        </Item>
    )
}