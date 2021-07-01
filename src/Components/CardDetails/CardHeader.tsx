import React, {ChangeEvent, useEffect, useReducer, useState} from "react";
import {ActionsType, changeCardTitle, initialState, mainReducer, removeCard} from "../../Redux/main-reducer";
import {localStorageEnum, StateType} from "../../Redux/state";
import {Button, Title} from "./CardDetails"
import styled from "styled-components";

type PropsType = {
    title: string
    id: string
    columnId: string
    closeModal: () => void
    columnTitle: string
    userName: string | null
}

export function CardHeader({title, columnTitle, columnId, id, closeModal, userName}: PropsType) {
    const [state, dispatch] = useReducer<React.Reducer<StateType, ActionsType>>(mainReducer, initialState)
    useEffect(() => {
        localStorage.setItem(localStorageEnum.board, JSON.stringify(state))
    }, [state])
    const [cardTitle, setCardTitle] = useState<string>(title)
    const [editTitleMode, setEditTitleMode] = useState<boolean>(false)
    const activateEditTitleMode = () => {
        setEditTitleMode(true)
    }
    const deactivateEditTitleMode = (e: ChangeEvent<HTMLInputElement>) => {
        setEditTitleMode(false)
        dispatch(changeCardTitle(id, columnId, cardTitle))
    }
    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCardTitle(e.currentTarget.value)
    }
    const deleteCard = () => {
        dispatch(removeCard(id, columnId))
        closeModal()
    }
    return (
        <Header>
            <div>
                {!editTitleMode ? (
                    <Title onClick={activateEditTitleMode}>
                        {title}
                    </Title>
                ) : (
                    <div>
                        <InputCardTitle
                            onChange={onTitleChange}
                            autoFocus
                            onBlur={deactivateEditTitleMode}
                            value={cardTitle}
                        />
                    </div>
                )}
                <HeaderInlineContent>
                    column: {columnTitle}
                </HeaderInlineContent>
                <HeaderInlineContent>
                    author: {userName}
                </HeaderInlineContent>
            </div>
            <Button onClick={deleteCard}>
                Remove card
            </Button>
        </Header>

    )
}

const Header = styled.div`
  margin: 22px 40px 20px 0;
  min-height: 32px;
  position: relative;
  display: flex;
  justify-content: space-between;
`

const HeaderInlineContent = styled.div`
  cursor: default;
  margin: 4px 8px 4px 2px;
  font-size: 12px;
`
const InputCardTitle = styled.input`
  width: 100%;
  margin-top: 8px;
  font-size: 24px;
`
