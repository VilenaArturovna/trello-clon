import styled from "styled-components"
import {localStorageEnum, StateType} from "../Reducers/state"
import React, {ChangeEvent, useEffect, useReducer, useState} from "react"
import {CardPropsType} from "./Card"
import {
    ActionsType,
    addDescription,
    changeCardTitle,
    initialState,
    mainReducer,
    removeCard
} from "../Reducers/main-reducer";

type PropsType = CardPropsType & { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }

export const CardDetails = ({
                                id,
                                title,
                                comments,
                                description,
                                columnTitle,
                                columnId,
                                isOpen,
                                setIsOpen
                            }: PropsType) => {
    const [state, dispatch] = useReducer<React.Reducer<StateType, ActionsType>>(mainReducer, initialState)
    const userName = localStorage.getItem(localStorageEnum.userName)

    //Change title of card
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

    //Remove card
    const deleteCard = () => {
        dispatch(removeCard(id, columnId))
        debugger
        setIsOpen(false)
    }

    //Actions for Description
    const [editDescMode, setEditDescMode] = useState<boolean>(false)
    const [desc, setDesc] = useState<string>(title)
    const onAddDescHandler = () => {
        setEditDescMode(true)
    }
    const onChangeDescHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDesc(e.currentTarget.value)
    }
    const onDescAdding = () => {
        dispatch(addDescription(id, columnId, desc))
        setEditDescMode(false)
    }


    useEffect(() => {
        localStorage.setItem(localStorageEnum.board, JSON.stringify(state))
    }, [state])


    const closeModalToCross = () => {
        setIsOpen(false)
    }


    return (
        <div tabIndex={0}><PopupBox>
            <Container>
                <Window>
                    <Wrapper>
                        <CloseIcon onClick={closeModalToCross}>X</CloseIcon>
                        <Header>
                            <div>
                                {!editTitleMode
                                    ? <Title onClick={activateEditTitleMode}>{title}</Title>
                                    : <div>
                                        <InputCardTitle onChange={onTitleChange} autoFocus={true}
                                                        onBlur={deactivateEditTitleMode}
                                                        value={cardTitle}/>
                                    </div>
                                }
                                <HeaderInlineContent>
                                    column: {columnTitle}
                                </HeaderInlineContent>
                                <HeaderInlineContent>
                                    author: {userName}
                                </HeaderInlineContent>
                            </div>
                            <Button onClick={deleteCard}>Remove card</Button>
                        </Header>
                        <Main>
                            <Description>
                                <Title>Description</Title>
                                {!description && !editDescMode ?
                                <Button onClick={onAddDescHandler}>Add description</Button> :
                                <DescriptionText onClick={onAddDescHandler}>{description}</DescriptionText>}
                                {editDescMode &&
                                <div>
                                    <TextField placeholder='Enter your description' value={desc}
                                               onChange={onChangeDescHandler}/>
                                    <Button onClick={onDescAdding}>Save</Button>
                                </div>}
                            </Description>
                            <Actions>
                                <Title>Actions</Title>
                                <TextField placeholder='Enter your comment'/>
                            </Actions>
                        </Main>
                    </Wrapper>
                </Window>
            </Container>
        </PopupBox></div>
    )
}
const PopupBox = styled.div`
  position: fixed;
  background: #00000050;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
`
const Container = styled.div`
  position: relative;
  padding: 20px;
  overflow: auto;
  width: 100%;
  display: flex;
  justify-content: center;
`
const Window = styled.div`
  width: 768px;
  height: 900px;
  background-color: white;
`
const Wrapper = styled.div`
  flex-direction: column;
  padding-left: 50px;
`
const CloseIcon = styled.span`
  position: relative;
  left: 690px;
  top: 10px;
  cursor: pointer;
`
const Button = styled.div`
  font-size: 20px;
  height: fit-content;
  padding: 5px;
  border-radius: 3px;
  width: fit-content;
  background-color: lightgray;

  &:hover {
    background-color: darkgray;
    cursor: pointer;
  }
`

//Header
const Header = styled.div`
  margin: 22px 40px 20px 0;
  min-height: 32px;
  position: relative;
  display: flex;
  justify-content: space-between;
`
const Title = styled.div`
  margin: 0px 0 10px;
  font-size: 24px;
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

//Main
const Main = styled.div`
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 24px;
  padding: 0 8px 8px 0;
  position: relative;
  width: 552px;
`
const Description = styled.div`
  margin-bottom: 24px;
  position: relative;
`
const DescriptionText = styled.div`
  font-size: 16px;
  padding-left: 20px;
`
const TextField = styled.textarea`
  width: 550px;
  height: 70px;
`
const Actions = styled.div`
  margin-bottom: 24px;
  position: relative;
`
