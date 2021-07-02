import {Button, ButtonGroup, TextField} from "./CardDetails";
import React, {useState} from "react";
import {changeComment, removeComment} from "../../Redux/main-reducer";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {userName} from "../../api/api";
import {Field, Form} from "react-final-form";
import {required} from "./CardHeader";

type PropsType = {
    commentId: string
    cardId: string
    columnId: string
    text: string
}

export function CommentItem({commentId, columnId, cardId, text}: PropsType) {
    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState<boolean>(false)

    const onChangeComment = (values: { comment: string }) => {
        dispatch(changeComment({commentId, cardId, columnId, comment: values.comment}))
        setEditMode(false)
    }
    const activateEditMode = () => {
        setEditMode(true)
    }
    const deleteComment = () => {
        dispatch(removeComment({commentId, cardId, columnId}))
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
                    <Form
                        onSubmit={onChangeComment}
                        initialValues={{comment: text}}
                        render={({handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <Field name="comment" validate={required}>
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
                                        Save
                                    </button>
                                    <button onClick={() => setEditMode(false)}>
                                        Cancel
                                    </button>
                                </ButtonGroup>
                            </form>
                        )}
                    />
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