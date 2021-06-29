import styled from "styled-components";
import {ChangeEvent, useState} from "react";
import {localStorageEnum, StateType} from "../Reducers/state";
import {useId} from "react-id-generator";

type PropsType = {
    handleClose: () => void
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
const Box = styled.div`
  position: relative;
  width: 30%;
  height: auto;
  margin: calc(100vh - 85vh - 20px) auto 0;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  overflow: auto;
`

export const PopUp = (props: PropsType) => {
    const [userName, setUserName] = useState('')
    const idList = useId(4, 'column')
    const stateToLS: StateType = {
        columns: [
            {id: idList[0], title: 'TODO', cards: []},
            {id: idList[1], title: 'Progress', cards: []},
            {id: idList[2], title: 'Testing', cards: []},
            {id: idList[3], title: 'Done', cards: []},
        ]
    }

    const enterName = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.currentTarget.value)
    }
    const setUserNameToLS = () => {
        localStorage.setItem(localStorageEnum.userName, userName)
        props.handleClose()

        localStorage.setItem(localStorageEnum.board, JSON.stringify(stateToLS))
    }

    return (
        <PopupBox>
            <Box>
                <form>
                    <input onChange={enterName} type="text" placeholder={'Enter your name'}/>
                    <button onClick={setUserNameToLS}>Send</button>
                </form>
            </Box>
        </PopupBox>
    );
};