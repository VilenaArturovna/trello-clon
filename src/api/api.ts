import {localStorageEnum} from "../Redux/state";

export const userName = localStorage.getItem(localStorageEnum.userName)
export const board = localStorage.getItem(localStorageEnum.board)
