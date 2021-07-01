import styled from "styled-components"
import {Card} from "./Card"
import React, {ChangeEvent, useEffect, useState} from "react"
import {addCardAC, changeColumnTitle} from "../Redux/main-reducer"
import {CardType, localStorageEnum, StateType} from "../Redux/state"
import {v1} from "uuid"
import {useDispatch, useSelector} from "react-redux";

type ColumnPropsType = {
    title: string
    id: string
    cards: Array<CardType>
}

export function Column({title, id, cards}: ColumnPropsType) {
    const dispatch = useDispatch()
    const state = useSelector<StateType, StateType>(state => state)

    useEffect(() => {
        localStorage.setItem(localStorageEnum.board, JSON.stringify(state))
    }, [state])

    //Change title of column
    const [columnTitle, setColumnTitle] = useState<string>(title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = (e: ChangeEvent<HTMLInputElement>) => {
        setEditMode(false)
        setColumnTitle(e.currentTarget.value)
        dispatch(changeColumnTitle(id, columnTitle))
    }
    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setColumnTitle(e.currentTarget.value)
    }

    //Add card
    const [cardTitle, setCardTitle] = useState<string>('')
    const [addingMode, setAddingMode] = useState<boolean>(false)
    const activateAddingMode = () => {
        setAddingMode(true)
    }
    /*
        const deactivateAddingMode = () => {
            setAddingMode(false)
        }
    */
    const onNewCardAdding = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCardTitle(e.currentTarget.value)
    }
    const addCard = () => {
        dispatch(addCardAC(id, cardTitle, v1()))
        setAddingMode(false)
        setCardTitle('')
    }

    return (
        <Section>
            {!editMode ? (
                <ColumnTitle onClick={activateEditMode}>
                    {title}
                </ColumnTitle>
            ) : (
                <input
                    onChange={onTitleChange}
                    autoFocus
                    onBlur={deactivateEditMode}
                    value={columnTitle}
                />
            )}
            <CardsList>
                {cards.map((card) => (
                    <Card
                        title={card.title}
                        key={card.id}
                        id={card.id}
                        columnId={id}
                        comments={card.comments}
                        description={card.description}
                        columnTitle={title}
                    />
                ))}
            </CardsList>
            <AddingCardsContainer>
                {!addingMode ? (
                    <span onClick={activateAddingMode}>
                        Add one more card
                    </span>
                ) : (
                    <div>
                        <textarea
                            placeholder="Enter text"
                            value={cardTitle}
                            autoFocus
                            onChange={onNewCardAdding}

                        />
                        <button onClick={addCard}>
                            Add card
                        </button>
                    </div>
                )}
            </AddingCardsContainer>
        </Section>
    )
}

const Section = styled.div`
  margin-left: 4px;
  margin-right: 4px;
  width: 272px;
  background-color: #ebecf0;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
  height: fit-content;
`
const ColumnTitle = styled.h3`
  text-align: start;
  padding-left: 10px;
`
const CardsList = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0 4px;
  padding: 0 4px;
  min-height: 0;
`
const AddingCardsContainer = styled.div`
  border-radius: 3px;
  color: #5e6c84;
  display: block;
  flex: 1 0 auto;
  margin: 2px 0 8px 8px;
  padding: 4px 8px;
  position: relative;
`