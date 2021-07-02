import styled from "styled-components"
import {localStorageEnum} from "../Redux/state"
import {Field, Form} from 'react-final-form'

type PropsType = {
    handleClose: () => void
}

export function PopUp(props: PropsType) {
    const setUserNameToLS = (values: { userName: string }) => {
        localStorage.setItem(localStorageEnum.userName, values.userName)
        props.handleClose()
    }

    return (
        <PopupBox>
            <Box>
                <Form
                    onSubmit={setUserNameToLS}
                    render={({handleSubmit, submitting, pristine}) => (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Label>Name</Label>
                                <Field
                                    name="userName"
                                    component="input"
                                    type="text"
                                    placeholder="Enter Your Name"
                                />
                            </div>
                            <SubmitButton>
                                <button type="submit" disabled={submitting || pristine}>
                                    Submit
                                </button>
                            </SubmitButton>
                        </form>
                    )}
                />
            </Box>
        </PopupBox>
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
const Label = styled.label`
  display: block;
  margin-bottom: 7px;
`
export const SubmitButton = styled.div`
  margin-top: 7px;
`