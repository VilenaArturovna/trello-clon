import React, {ChangeEvent, useEffect, useReducer, useState} from "react";
import {Button, TextField, Title} from "./CardDetails";
import styled from "styled-components";
import {CommentType, localStorageEnum, StateType} from "../../Reducers/state";
import {ActionsType, addComment, changeComment, initialState, mainReducer} from "../../Reducers/main-reducer";
import {CommentItem} from "./CommentItem";

type PropsType = {
    userName: string | null
    comments: Array<CommentType>
    id: string
    columnId: string
}

export function CardComments({userName, comments, id, columnId}: PropsType) {
    const [state, dispatch] = useReducer<React.Reducer<StateType, ActionsType>>(mainReducer, initialState)
    useEffect(() => {
        localStorage.setItem(localStorageEnum.board, JSON.stringify(state))
    }, [state])

    const [newComment, setNewComment] = useState<string>('')
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.currentTarget.value)
    }
    const onAddComment = () => {
        dispatch(addComment(id, columnId, newComment))
    }



    return (
        <Comments>
            <Title>
                Comments
            </Title>
            <TextField placeholder="Enter your comment" value={newComment} onChange={onChangeHandler}/>
            <Button onClick={onAddComment}>Add comment</Button>
            {comments.map((com) => (
                <CommentItem
                    key={com.id}
                    columnId={columnId}
                    id={com.id}
                    userName={userName}
                    cardId={id}
                    text={com.text}

                />
            ))}
        </Comments>
    )
}

const Comments = styled.div`
  margin-bottom: 24px;
  position: relative;
`
