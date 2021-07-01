import React, {ChangeEvent, useEffect, useReducer, useState} from "react";
import {Button, Title, TextField, ButtonGroup} from "./CardDetails";
import styled from "styled-components";
import {ActionsType, addDescription, initialState, mainReducer} from "../../Redux/main-reducer";
import {localStorageEnum, StateType} from "../../Redux/state";

type PropsType = {
    description: string
    id: string
    columnId: string
}

export function CardDescription({description, id, columnId}: PropsType) {

    const [state, dispatch] = useReducer<React.Reducer<StateType, ActionsType>>(mainReducer, initialState)
    useEffect(() => {
        localStorage.setItem(localStorageEnum.board, JSON.stringify(state))
    }, [state])

    const [editDescMode, setEditDescMode] = useState<boolean>(false)
    const [desc, setDesc] = useState<string>(description)
    const onAddDescHandler = () => {
        setEditDescMode(true)
    }
    const onChangeDescHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDesc(e.currentTarget.value)
    }
    const onDescAdding = () => {
        dispatch(addDescription(id, columnId, desc))
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
                        value={desc}
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
