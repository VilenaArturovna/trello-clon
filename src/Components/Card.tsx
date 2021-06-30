import styled from "styled-components"
import React, {useState} from "react"
import {CommentType} from "../Reducers/state"
import {CardDetails} from "./CardDetails"

export type CardPropsType = {
    columnTitle: string
    columnId: string
    id: string
    title: string
    description: string
    comments: Array<CommentType>
}

export const Card = ({id, title, comments, description, columnTitle, columnId}: CardPropsType) => {

    const [isOpen, setIsOpen] = useState(false)
    const seeCardDetails = () => {
        setIsOpen(true)
    }

    return (
        <div onClick={seeCardDetails} onKeyDown={(e) => (e.key === 'Escape' && isOpen && setIsOpen(false))}>
            <Item>

                <ItemDetails>{title}</ItemDetails>
                {comments.length > 0 && <Comments>comments: {comments.length}</Comments>}

            </Item>
            {isOpen && <CardDetails id={id} title={title} comments={comments} description={description} isOpen={isOpen}
                                    setIsOpen={setIsOpen} columnTitle={columnTitle} columnId={columnId}/>}
        </div>
    )
}

const Item = styled.div`
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
  cursor: pointer;
  display: block;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 20px;
  position: relative;
  text-decoration: none;
`
const ItemDetails = styled.div`
  overflow: hidden;
  padding: 6px 8px 2px;
  position: relative;
  display: flex;
  flex-direction: column;
`
const Comments = styled.span`
  font-size: 10px;
  color: grey;
  margin-left: 20px;
`