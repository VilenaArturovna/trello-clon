import React, {useState} from "react";
import {changeCardTitle, removeCard} from "../../../Redux/main-reducer";
import {Button, ButtonGroup, Title} from "../CardDetails"
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {Field, Form} from "react-final-form";
import {getUserName} from "../../../Redux/selectors";

type PropsType = {
    title: string
    cardId: string
    columnId: string
    closeModal: () => void
    columnTitle: string
}
export const required = (value: any) => (value ? undefined : 'Required')

export function CardHeader({title, columnTitle, columnId, cardId, closeModal}: PropsType) {
    const dispatch = useDispatch()
    const [isEditTitleMode, setIsEditTitleMode] = useState<boolean>(false)
    const activateEditTitleMode = () => {
        setIsEditTitleMode(true)
    }
    const onChangeTitle = (values: { newTitle: string }) => {
        setIsEditTitleMode(false)
        dispatch(changeCardTitle({cardId, columnId, newTitle: values.newTitle}))
    }
    const deleteCard = () => {
        dispatch(removeCard({cardId: cardId, columnId}))
        closeModal()
    }
    const userName = useSelector(getUserName)


    return (
        <Header>
            <div>
                {!isEditTitleMode ? (
                    <Title onClick={activateEditTitleMode}>
                        {title}
                    </Title>
                ) : (
                    <div>
                        <Form
                            onSubmit={onChangeTitle}
                            initialValues={{newTitle: title}}
                            render={({handleSubmit}) => (
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <Field name="newTitle" validate={required}>
                                            {({input, meta}) => (
                                                <div>
                                                    <InputCardTitle {...input} type="text" placeholder="newTitle"/>
                                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                                </div>
                                            )}
                                        </Field>

                                    </div>
                                    <ButtonGroup>
                                        <button type="submit">
                                            Save
                                        </button>
                                        <button onClick={() => setIsEditTitleMode(false)}>
                                            Cancel
                                        </button>
                                    </ButtonGroup>
                                </form>
                            )}
                        />
                    </div>
                )}
                <HeaderInlineContent>column: {columnTitle}</HeaderInlineContent>
                <HeaderInlineContent>author: {userName}</HeaderInlineContent>
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
