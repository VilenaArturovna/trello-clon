import React, {ChangeEvent, useState} from "react";
import {Button, TextField, Title} from "./CardDetails";
import styled from "styled-components";
import {CommentType} from "../../Redux/state";
import {addComment} from "../../Redux/main-reducer";
import {CommentItem} from "./CommentItem";
import {useDispatch} from "react-redux";

type PropsType = {
    comments: Array<CommentType>
    id: string
    columnId: string
}

export function CardComments({comments, id, columnId}: PropsType) {
    const dispatch = useDispatch()

    const [newComment, setNewComment] = useState<string>('')
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.currentTarget.value)
    }
    const onAddComment = () => {
        setNewComment('')
        dispatch(addComment(id, columnId, newComment))
    }

    return (
        <Comments>
            <Title>
                Comments
            </Title>
            <TextField placeholder="Enter your comment" value={newComment} onChange={onChangeHandler} />
            <Button onClick={onAddComment}>Add comment</Button>
            {comments.map((com) => (
                <CommentItem
                    key={com.id}
                    columnId={columnId}
                    id={com.id}
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
