import styled from "styled-components"
import React from "react"
import {CardPropsType} from "../Card"
import {CardHeader} from "./CardHeader";
import {CardDescription} from "./CardDescription";
import {CardComments} from "./CardComments";

type PropsType = CardPropsType & { closeModal: () => void }

export function CardDetails({
                                id,
                                title,
                                comments,
                                description,
                                columnTitle,
                                columnId,
                                closeModal
                            }: PropsType) {
    return (
        <div>
            <PopupBox>
                <Container>
                    <Window>
                        <Wrapper>
                            <CloseIcon onClick={closeModal}>
                                X
                            </CloseIcon>
                            <CardHeader
                                cardId={id}
                                title={title}
                                columnId={columnId}
                                columnTitle={columnTitle}
                                closeModal={closeModal}
                            />
                            <Main>
                                <CardDescription desc={description} cardId={id} columnId={columnId}/>
                                <CardComments cardId={id} columnId={columnId} comments={comments}/>
                            </Main>
                        </Wrapper>
                    </Window>
                </Container>
            </PopupBox>
        </div>
    )
}

const PopupBox = styled.div`
  position: fixed;
  background: #00000050;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;
`
const Container = styled.div`
  position: relative;
  padding: 20px;
  overflow: auto;
  width: 100%;
  display: flex;
  justify-content: center;
`
const Window = styled.div`
  width: 768px;
  min-height: 900px;
  background-color: white;
`
const Wrapper = styled.div`
  flex-direction: column;
  padding-left: 50px;
`
const CloseIcon = styled.span`
  position: relative;
  left: 690px;
  top: 10px;
  cursor: pointer;
`
export const Button = styled.div`
  font-size: 12px;
  height: fit-content;
  padding: 5px;
  margin: 5px;
  border-radius: 3px;
  width: fit-content;
  background-color: lightgray;

  &:hover {
    background-color: darkgray;
    cursor: pointer;
  }
`
export const ButtonGroup = styled.div`
  display: flex;
`
export const Title = styled.div`
  margin: 0 0 10px;
  font-size: 24px;
`
export const TextField = styled.input`
  width: 550px;
  height: 45px;
  padding-bottom: 10px;
`
const Main = styled.div`
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 24px;
  padding: 0 8px 8px 0;
  position: relative;

`
