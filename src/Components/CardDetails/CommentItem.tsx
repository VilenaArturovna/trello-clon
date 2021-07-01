import {Button, ButtonGroup, TextField} from "./CardDetails";
import React, {ChangeEvent, useEffect, useReducer, useState} from "react";
import {ActionsType, changeComment, initialState, mainReducer, removeComment} from "../../Redux/main-reducer";
import {localStorageEnum, StateType} from "../../Redux/state";
import styled from "styled-components";

type PropsType = {
    id: string
    cardId: string
    columnId: string
    userName: string | null
    text: string
}

export function CommentItem({id, columnId, cardId, userName, text}: PropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [state, dispatch] = useReducer<React.Reducer<StateType, ActionsType>>(mainReducer, initialState)
    const [comment, setComment] = useState<string>(text)
    useEffect(() => {
        localStorage.setItem(localStorageEnum.board, JSON.stringify(state))
    }, [state])
    const onChangeComment = () => {
        dispatch(changeComment(id, cardId, columnId, comment))
        setEditMode(false)
    }
    const activateEditMode = () => {
        setEditMode(true)
    }
    const deleteComment = () => {
        dispatch(removeComment(id, cardId, columnId))
    }
    const onChangeCommentHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.currentTarget.value)
    }
    return (
        <Comment>
            {!editMode ? (
                <>
                    <Author>
                        {userName}
                    </Author>
                    <CommentText>
                        {text}
                    </CommentText>
                    <ButtonGroup>
                        <Button onClick={activateEditMode}>
                            Change
                        </Button>
                        <Button onClick={deleteComment}>
                            Delete
                        </Button>
                    </ButtonGroup>
                </>
            ) : (
                <>
                    <TextField value={comment} onChange={onChangeCommentHandler}/>
                    <Button onClick={onChangeComment}>
                        Save
                    </Button>
                </>
            )}
        </Comment>
    )
}

const Comment = styled.div`
  font-size: 16px;
  margin: 0 0 15px 20px;
`
const CommentText = styled.p`
  margin: 0 0 0 15px;
`
const Author = styled.p`
  margin: 0 0 5px 0;
  font-size: 12px;
`