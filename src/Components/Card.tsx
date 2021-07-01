import styled from "styled-components"
import React, {useState} from "react"
import {CommentType} from "../Redux/state"
import {CardDetails} from "./CardDetails/CardDetails"

export type CardPropsType = {
    columnTitle: string
    columnId: string
    id: string
    title: string
    description: string
    comments: Array<CommentType>
}

export function Card({id, title, comments, description, columnTitle, columnId}: CardPropsType) {
    const [isOpen, setIsOpen] = useState(false)
    console.log("isOpen: " + isOpen)
    const seeCardDetails = () => {
        setIsOpen(true)
        if (divRef && divRef.current) {
            debugger
            divRef.current.focus();
        }
    }
    const divRef = React.createRef<HTMLDivElement>();

    const props = {id, title, comments, description, columnTitle, columnId}
    return (
        <div onClick={seeCardDetails}>
            <Item>
                <ItemDetails>
                    {title}
                </ItemDetails>
                {comments.length > 0 && (
                    <Comments>
                        comments: {comments.length}
                    </Comments>
                )}
            </Item>
            {isOpen && (
                <div
                    ref={divRef}
                    onKeyDown={(e) => {
                        if (e.code === "Escape" && isOpen) {
                            console.log('esc')
                            setIsOpen(false)
                        }
                    }}>
                    <CardDetails
                        {...props}
                        isOpenModal={isOpen}
                        closeModal={() => setIsOpen(false)}
                    />
                </div>
            )}
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