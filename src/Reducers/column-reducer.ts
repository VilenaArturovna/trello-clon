import {ColumnType} from "./state";

export const initialStateOfColumn: Array<ColumnType> = [
    {id: 1, title: 'TODO', cards: []},
    {id: 2, title: 'Progress', cards: []},
    {id: 3, title: 'Testing', cards: []},
    {id: 4, title: 'Done', cards: []},
]

export const columnReducer = (state = initialStateOfColumn, action: ActionsType) => {
    switch (action.type) {
        case "CHANGE-COLUMN-TITLE":
            let copyState = [...state]
            let column = copyState.find(c => c.id === action.id)
            if (column) {
                column.title = action.newTitle
            }
            return copyState
        case "ADD-CARD":
            return {...state}
        case "FETCH-COLUMNS":

            return state.map(col => ({...col}))
        default:
            return state
    }
}

type ActionsType = ReturnType<typeof changeColumnTitle> | ReturnType<typeof addCard> | ReturnType<typeof fetchColumns>

export const changeColumnTitle = (id: number,  newTitle: string) => ({type: 'CHANGE-COLUMN-TITLE', id, newTitle} as const)
export const addCard = (columnId: number, cardTitle: string) => ({type: 'ADD-CARD', columnId, cardTitle} as const)
export const fetchColumns = () => ({type: 'FETCH-COLUMNS'} as const)