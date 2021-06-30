import {ColumnType, localStorageEnum, StateType} from "./state"
import {v1} from "uuid";

const board = localStorage.getItem(localStorageEnum.board)

export const initialState: StateType = board ? JSON.parse(board) : {
    columns: [
        {id: v1(), title: 'TODO', cards: []},
        {id: v1(), title: 'Progress', cards: []},
        {id: v1(), title: 'Testing', cards: []},
        {id: v1(), title: 'Done', cards: []},
    ]
}

export const mainReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case "CHANGE-COLUMN-TITLE":
            const copy = {...state}
            const column = copy.columns.find(c => c.id === action.id)
            if (column) {
                column.title = action.newTitle
            }
            return copy
        case "FETCH-COLUMNS": {
            const copy = {...state}
            copy.columns = action.columns.map(col => ({...col, cards: col.cards.map(card => ({...card}))}))
            return copy
        }
        case "ADD-CARD": {
            const copy = {...state}
            copy.columns = state.columns.map(col => ({...col}))
            let column = copy.columns.find(c => c.id === action.columnId)
            if (column) {
                column.cards.push({id: action.cardId, title: action.cardTitle, comments: [], description: ''})
            }
            return copy
        }
        case "FETCH-CARDS": {
            const copy = {...state}
            copy.columns = state.columns.map(col => ({...col}))
            let column = copy.columns.find(c => c.id === action.columnId)
            if (column) {
                column.cards = column.cards.map(card => ({...card}))
            }
            return copy
        }
        case "CHANGE-CARD-TITLE": {
            const copy = {...state}
            const column = copy.columns.find(c => c.id === action.columnId)
            const card = column && column.cards.find(c => c.id === action.cardId)
            card && (card.title = action.newTitle)
            return copy
        }
        case "REMOVE-CARD": {
            const copy = {...state}
            let column = copy.columns.find(c => c.id === action.columnId)
            column && (column.cards = column.cards.filter(c => c.id !== action.cardId))
            debugger
            return copy
        }
        default:
            return state
    }
}

export type ActionsType =
    ReturnType<typeof changeColumnTitle> |
    ReturnType<typeof addCardAC> |
    ReturnType<typeof fetchColumns> |
    ReturnType<typeof removeCard> |
    ReturnType<typeof changeCardTitle> |
    ReturnType<typeof addDescription> |
    ReturnType<typeof changeDescription> |
    ReturnType<typeof removeDescription> |
    ReturnType<typeof addComment> |
    ReturnType<typeof changeComment> |
    ReturnType<typeof removeComment> |
    ReturnType<typeof fetchCards>

export const changeColumnTitle = (id: string, newTitle: string) => ({
    type: 'CHANGE-COLUMN-TITLE', id, newTitle
} as const)
export const addCardAC = (columnId: string, cardTitle: string, cardId: string) => ({
    type: 'ADD-CARD', columnId, cardTitle, cardId
} as const)
export const fetchColumns = (columns: Array<ColumnType>) => ({type: 'FETCH-COLUMNS', columns} as const)

export const removeCard = (cardId: string, columnId: string) => ({
    type: 'REMOVE-CARD', cardId, columnId
} as const)
export const changeCardTitle = (cardId: string, columnId: string, newTitle: string) => ({
    type: 'CHANGE-CARD-TITLE', cardId, columnId, newTitle
} as const)
export const addDescription = (cardId: string, columnId: string, description: string) => ({
    type: 'ADD-DESCRIPTION', cardId, columnId, description
} as const)
export const changeDescription = (cardId: string, columnId: string, newDescription: string) => ({
    type: 'CHANGE-DESCRIPTION', cardId, columnId, newDescription
} as const)
export const removeDescription = (cardId: string, columnId: string) => ({
    type: 'REMOVE-DESCRIPTION', cardId, columnId
} as const)
export const addComment = (cardId: string, columnId: string, comment: string) => ({
    type: 'ADD-COMMENT', cardId, columnId, comment
} as const)
export const changeComment = (commentId: string, cardId: string, columnId: string, newValue: string) => ({
    type: 'CHANGE-COMMENT', commentId, cardId, columnId, newValue
} as const)
export const removeComment = (commentId: string, cardId: string, columnId: string) => ({
    type: 'REMOVE-COMMENT', commentId, cardId, columnId
} as const)
export const fetchCards = (columnId: string) => ({type: 'FETCH-CARDS', columnId} as const)