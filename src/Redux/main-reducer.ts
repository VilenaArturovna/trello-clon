import {StateType} from "./state"
import {v1} from "uuid";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const initialState: StateType = {
    columns: [
        {id: v1(), title: 'TODO', cards: []},
        {id: v1(), title: 'Progress', cards: []},
        {id: v1(), title: 'Testing', cards: []},
        {id: v1(), title: 'Done', cards: []},
    ],
    userName: ''
}

const slice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        changeColumnTitle(state, action: PayloadAction<{ id: string, newTitle: string }>) {
            const column = state.columns.find(column => column.id === action.payload.id)
            if (column) {
                column.title = action.payload.newTitle
            }
        },
        addCardAC(state, action: PayloadAction<{ columnId: string, cardTitle: string, cardId: string }>) {
            state.columns.map(column => column.id === action.payload.columnId
                ? {
                    ...column, cards: column.cards.push({
                        id: action.payload.cardId,
                        title: action.payload.cardTitle,
                        comments: [],
                        description: ''
                    })
                }
                : column)
        },
        removeCard(state, action: PayloadAction<{ cardId: string, columnId: string }>) {
            const column = state.columns.find((column) => column.id === action.payload.columnId)
            if (column) {
                column.cards = column.cards.filter((c) => (c.id !== action.payload.cardId))
            }
        },
        changeCardTitle(state, action: PayloadAction<{ cardId: string, columnId: string, newTitle: string }>) {
            const column = state.columns.find((column) => column.id === action.payload.columnId)
            if (column) {
                const card = column.cards.find((card) => card.id = action.payload.cardId)
                if (card) {
                    card.title = action.payload.newTitle
                }
            }
        },
        addDescription(state, action: PayloadAction<{ cardId: string, columnId: string, description: string }>) {
            const column = state.columns.find((column) => column.id === action.payload.columnId)
            if (column) {
                const card = column.cards.find((card) => card.id = action.payload.cardId)
                if (card) {
                    card.description = action.payload.description
                }
            }
        },
        addComment(state, action: PayloadAction<{ cardId: string, columnId: string, newComment: string }>) {
            const column = state.columns.find((column) => column.id === action.payload.columnId)
            if (column) {
                const card = column.cards.find((card) => card.id = action.payload.cardId)
                if (card) {
                    card.comments.push({
                        text: action.payload.newComment,
                        id: v1()
                    })
                }
            }
        },
        changeComment(state, action: PayloadAction<{ commentId: string, cardId: string, columnId: string, comment: string }>) {
            const column = state.columns.find((column) => column.id === action.payload.columnId)
            if (column) {
                const card = column.cards.find((card) => card.id = action.payload.cardId)
                if (card) {
                    const comment = card.comments.find((comment) => comment.id = action.payload.commentId)
                    if (comment) {
                        comment.text = action.payload.comment
                    }
                }
            }
        },
        removeComment(state, action: PayloadAction<{ commentId: string, cardId: string, columnId: string }>) {
            const column = state.columns.find((column) => column.id === action.payload.columnId)
            if (column) {
                const card = column.cards.find((card) => card.id = action.payload.cardId)
                if (card) {
                    card.comments = card.comments.filter((comment) => (comment.id !== action.payload.commentId))
                }
            }
        },
        setUserName(state, action: PayloadAction<{ userName: string }>) {
            if (action.payload.userName) {
                state.userName = action.payload.userName
            }
        }
    }
})

export const {
    changeColumnTitle,
    addCardAC,
    removeCard,
    changeCardTitle,
    addDescription,
    addComment,
    changeComment,
    removeComment,
    setUserName
} = slice.actions

export const mainReducer = slice.reducer


