import styled from "styled-components";
import {Card} from "./Card";
import {ChangeEvent, useReducer, useState} from "react";
import {changeColumnTitle, columnReducer} from "../Reducers/column-reducer";

type ColumnType = {
    title: string
    id: number
}

const Section = styled.div`
  margin-left: 4px;
  margin-right: 4px;
  width: 272px;
  height: 100%;
  border: 1px solid #282c34;
  border-radius: 10px;
`
const CardTitle = styled.h3`
  text-align: start;
  padding-left: 10px;
`

export const Column = ({title, id}: ColumnType) => {
    const [columnTitle, setColumnTitle] = useState<string>(title)
    const [columns, dispatch] = useReducer(columnReducer, [])
    const [editMode, setEditMode] = useState<boolean>(false)
    const [addingMode, setAddingMode] = useState<boolean>(false)

    //Change title

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = (e: ChangeEvent<HTMLInputElement>) => {
        setEditMode(false)
        dispatch(changeColumnTitle(id, e.currentTarget.value))

    }
    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setColumnTitle(e.currentTarget.value)
    }

    //Add card

    const activateAddingMode = () => {
        setAddingMode(true)
    }
    const addCard = () => {

        setAddingMode(false)
    }

    return (
        <Section>
            {!editMode
                ? <CardTitle onClick={activateEditMode}>{columnTitle}</CardTitle>
                : <input onChange={onTitleChange} autoFocus={true} onBlur={deactivateEditMode}
                         onKeyDown={e => e.key === 'Enter' && deactivateEditMode}
                         value={columnTitle}/>
            }

            <Card title={'hello'}/>

            {
                !addingMode
                    ? <span onClick={activateAddingMode}>Добавить еще одну карточку</span>
                    : <div>
                        <textarea name="sssss"></textarea>
                        <button onClick={addCard}>Add</button>
                    </div>

            }


        </Section>
    )
}