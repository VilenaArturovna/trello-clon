import styled from "styled-components"
import {Card} from "./Card"
import React, {useState} from "react"
import {addCardAC, changeColumnTitle} from "../Redux/main-reducer"
import {CardType} from "../Redux/state"
import {v1} from "uuid"
import {useDispatch} from "react-redux";
import {Field, Form} from "react-final-form";
import {ButtonGroup} from "./CardDetails/CardDetails";
import {required} from "./CardDetails/CardHeader";

type ColumnPropsType = {
    title: string
    id: string
    cards: Array<CardType>
}

export function Column({title, id, cards}: ColumnPropsType) {
    const dispatch = useDispatch()

    //Change title of column
    const [editMode, setEditMode] = useState<boolean>(false)
    const activateEditMode = () => {
        setEditMode(true)
    }
    const onChangeTitle = (values: { newTitle: string }) => {
        dispatch(changeColumnTitle({id, newTitle: values.newTitle}))
        setEditMode(false)
    }

    //Add card
    const [addingMode, setAddingMode] = useState<boolean>(false)
    const activateAddingMode = () => {
        setAddingMode(true)
    }
    const addCard = (values: { cardTitle: string }) => {
        dispatch(addCardAC({columnId: id, cardTitle: values.cardTitle, cardId: v1()}))
        setAddingMode(false)
    }

    return (
        <Section>
            {!editMode ? (
                <ColumnTitle onClick={activateEditMode}>
                    {title}
                </ColumnTitle>
            ) : (
                <Form
                    onSubmit={onChangeTitle}
                    initialValues={{newTitle: title}}
                    render={({handleSubmit}) => (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Field name="newTitle" validate={required}>
                                    {({input, meta}) => (
                                        <div>
                                            <input {...input} type="text" placeholder="newTitle"/>
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
                    <Form
                        onSubmit={addCard}
                        render={({handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <Field name="cardTitle" validate={required}>
                                        {({input, meta}) => (
                                            <div>
                                                <Input {...input} type="text" placeholder="Enter text"/>
                                                {(meta.error && meta.touched) && <div>{meta.error}</div>}
                                            </div>
                                        )}
                                    </Field>
                                </div>
                                <ButtonGroup>
                                    <button type="submit">
                                        Add card
                                    </button>
                                    <button onClick={() => setAddingMode(false)}>
                                        Cancel
                                    </button>
                                </ButtonGroup>
                            </form>
                        )}
                    />
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
const Input = styled.input`
  height: 30px;
`