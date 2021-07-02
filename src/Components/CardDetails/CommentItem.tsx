import {Button, ButtonGroup, TextField} from "./CardDetails";
import React, {ChangeEvent, useState} from "react";
import {changeComment, removeComment} from "../../Redux/main-reducer";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {userName} from "../../api/api";

type PropsType = {
    commentId: string
    cardId: string
    columnId: string
    text: string
}

export function CommentItem({commentId, columnId, cardId, text}: PropsType) {
    const dispatch = useDispatch()
    const [comment, setComment] = useState<string>(text)
    const [editMode, setEditMode] = useState<boolean>(false)

    const onChangeComment = () => {
        dispatch(changeComment({commentId, cardId, columnId, comment}))
        setEditMode(false)
    }
    const activateEditMode = () => {
        setEditMode(true)
    }
    const deleteComment = () => {
        debugger
        dispatch(removeComment({commentId, cardId, columnId}))
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