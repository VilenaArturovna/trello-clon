import React, {useState} from "react";
import {Button, ButtonGroup, TextField, Title} from "../CardDetails";
import styled from "styled-components";
import {addDescription} from "../../../Redux/main-reducer";
import {useDispatch} from "react-redux";
import {Field, Form} from "react-final-form";

type PropsType = {
    desc: string
    cardId: string
    columnId: string
}

export function CardDescription({desc, cardId, columnId}: PropsType) {
    const dispatch = useDispatch()
    const [isEditDescMode, setIsEditDescMode] = useState<boolean>(false)
    const onAddDescHandler = () => {
        setIsEditDescMode(true)
    }
    const onDescAdding = (values: { description: string }) => {
        dispatch(addDescription({cardId, columnId, description: values.description}))
        setIsEditDescMode(false)
    }
    const onDescClear = () => {
        dispatch(addDescription({cardId, columnId, description: ''}))
        setIsEditDescMode(true)
    }

    return (
        <Description>
            <Title>
                Description
            </Title>
            {!desc && !isEditDescMode ? (
                <Button onClick={onAddDescHandler}>
                    Add description
                </Button>
            ) : (
                <>
                    {!isEditDescMode && (
                        <>
                            <DescriptionText onClick={onAddDescHandler}>
                                {desc}
                            </DescriptionText>
                            <Button onClick={onAddDescHandler}>
                                Change
                            </Button>
                        </>
                    )}
                </>
            )}
            {isEditDescMode
            && (
                <div>
                    <Form
                        onSubmit={onDescAdding}
                        initialValues={{description: desc}}
                        render={({handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <Field name="description">
                                        {({input, meta}) => (
                                            <div>
                                                <TextField {...input} type="text" placeholder="add description"/>
                                                {meta.error && meta.touched && <span>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>
                                </div>
                                <ButtonGroup>
                                    <button type="submit">
                                        Save
                                    </button>
                                    <button onClick={onDescClear}>
                                        Delete
                                    </button>
                                </ButtonGroup>
                            </form>
                        )}
                    />
                </div>
            )}
        </Description>

    )
}


const Description = styled.div`
  margin-bottom: 24px;
  position: relative;
`
const DescriptionText = styled.div`
  font-size: 16px;
  padding-left: 20px;
  padding-bottom: 10px;
`
