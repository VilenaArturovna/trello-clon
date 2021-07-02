import React from "react";
import {ButtonGroup, TextField, Title} from "./CardDetails";
import styled from "styled-components";
import {CommentType} from "../../Redux/state";
import {addComment} from "../../Redux/main-reducer";
import {CommentItem} from "./CommentItem";
import {useDispatch} from "react-redux";
import {Field, Form} from "react-final-form";
import {required} from "./CardHeader";

type PropsType = {
    comments: Array<CommentType>
    cardId: string
    columnId: string
}

export function CardComments({comments, cardId, columnId}: PropsType) {
    const dispatch = useDispatch()
    const onAddComment = (values: {newComment: string}) => {
        dispatch(addComment({cardId: cardId, columnId, newComment: values.newComment}))
    }

    return (
        <Comments>
            <Title>
                Comments
            </Title>
            <Form
                onSubmit={onAddComment}
                render={({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Field name="newComment" validate={required}>
                                {({input, meta}) => (
                                    <div>
                                        <TextField {...input} type="text"/>
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </div>
                                )}
                            </Field>
                        </div>
                        <ButtonGroup>
                            <button type="submit">
                                Add
                            </button>
                        </ButtonGroup>
                    </form>
                )}
            />
            {comments.map((com) => (
                <CommentItem
                    key={com.id}
                    columnId={columnId}
                    commentId={com.id}
                    cardId={cardId}
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
