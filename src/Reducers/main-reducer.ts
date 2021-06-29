import {ColumnType, localStorageEnum, StateType} from "./state";

const board = localStorage.getItem(localStorageEnum.board)

export const initialState: StateType = board ? JSON.parse(board) : {columns: []}

export const mainReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case "CHANGE-COLUMN-TITLE":
            let copyState = {...state}
            let column = copyState.columns.find(c => c.id === action.id)
            if (column) {
                column.title = action.newTitle
            }
            debugger
            return copyState
        case "FETCH-COLUMNS":
            const copy = {...state}
            copy.columns = action.columns.map(col => ({...col}))
            return copy
        case "ADD-CARD":
            return {...state}
        default:
            return state
    }
}

export type ActionsType =
    ReturnType<typeof changeColumnTitle>
    | ReturnType<typeof addCardAC>
    | ReturnType<typeof fetchColumns>

export const changeColumnTitle = (id: string, newTitle: string) => ({
    type: 'CHANGE-COLUMN-TITLE',
    id,
    newTitle
} as const)
export const addCardAC = (columnId: string, cardTitle: string) => ({type: 'ADD-CARD', columnId, cardTitle} as const)
export const fetchColumns = (columns: Array<ColumnType>) => ({type: 'FETCH-COLUMNS', columns} as const)