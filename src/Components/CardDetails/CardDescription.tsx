import React, {ChangeEvent, useState} from "react";
import {Button, ButtonGroup, TextField, Title} from "./CardDetails";
import styled from "styled-components";
import {addDescription} from "../../Redux/main-reducer";
import {useDispatch} from "react-redux";

type PropsType = {
    desc: string
    cardId: string
    columnId: string
}

export function CardDescription({desc, cardId, columnId}: PropsType) {
    const dispatch = useDispatch()

    const [editDescMode, setEditDescMode] = useState<boolean>(false)
    const [description, setDesc] = useState<string>(desc)
    const onAddDescHandler = () => {
        setEditDescMode(true)
    }
    const onChangeDescHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDesc(e.currentTarget.value)
    }
    const onDescAdding = () => {
        dispatch(addDescription({cardId: cardId, columnId, description}))
        setEditDescMode(false)
    }
    const onDescClear = () => {
        setDesc('')
    }

    return (
        <Description>
            <Title>
                Description
            </Title>
            {!description && !editDescMode ? (
                <Button onClick={onAddDescHandler}>
                    Add description
                </Button>
            ) : (
                <>
                    {!editDescMode && (
                        <>
                            <DescriptionText onClick={onAddDescHandler}>
                                {description}
                            </DescriptionText>
                            <Button onClick={onAddDescHandler}>
                                Change
                            </Button>
                        </>
                    )}
                </>
            )}
            {editDescMode
            && (
                <div>
                    <TextField
                        placeholder="Enter your description"
                        value={description}
                        onChange={onChangeDescHandler}
                    />
                    <ButtonGroup>
                        <Button onClick={onDescAdding}>
                            Save
                        </Button>
                        <Button onClick={onDescClear}>
                            Clear
                        </Button>
                    </ButtonGroup>
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
