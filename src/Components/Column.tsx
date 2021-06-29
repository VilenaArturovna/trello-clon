import styled from "styled-components";
import {Card} from "./Card";
import React, {ChangeEvent, useEffect, useReducer, useState} from "react";
import {ActionsType, addCardAC, changeColumnTitle, initialState, mainReducer} from "../Reducers/main-reducer";
import {localStorageEnum, StateType} from "../Reducers/state";

type ColumnType = {
    title: string
    id: string
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
  z-index: 1;
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

export const Column = ({title, id}: ColumnType) => {

    const [columnTitle, setColumnTitle] = useState<string>(title)
    const [state, dispatch] = useReducer<React.Reducer<StateType, ActionsType>>(mainReducer, initialState)
    const [cardTitle, setCardTitle] = useState<string>('')

    const [editMode, setEditMode] = useState<boolean>(false)
    const [addingMode, setAddingMode] = useState<boolean>(false)

    useEffect(()=>{
        debugger
        localStorage.setItem(localStorageEnum.board, JSON.stringify(state))
    }, [state])

    //Change title

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = (e: ChangeEvent<HTMLInputElement>) => {
        setEditMode(false)
        dispatch(changeColumnTitle(id, e.currentTarget.value))
    }
    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setColumnTitle(e.currentTarget.value)
    }

    //Add card

    const activateAddingMode = () => {
        setAddingMode(true)
    }
    const addCard = () => {
        dispatch(addCardAC(id, cardTitle))
        setAddingMode(false)
    }

    return (
        <Section>
            {!editMode
                ? <ColumnTitle onClick={activateEditMode}>{columnTitle}</ColumnTitle>
                : <input onChange={onTitleChange} autoFocus={true} onBlur={deactivateEditMode}
                         onKeyDown={e => e.key === 'Enter' && deactivateEditMode}
                         value={columnTitle}/>
            }
            <CardsList>
                <Card title={'hello'}/>
                <Card title={'world'}/>
            </CardsList>
            <AddingCardsContainer>
                {
                    !addingMode
                        ? <span onClick={activateAddingMode}>Add one more card</span>
                        : <div>
                            <textarea placeholder={'Enter text'}></textarea>
                            <button onClick={addCard}>Add card</button>
                        </div>

                }
            </AddingCardsContainer>
        </Section>
    )
}