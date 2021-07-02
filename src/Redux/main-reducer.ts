import {ColumnType, StateType} from "./state"
import {v1} from "uuid";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {board} from "../api/api";

export const initialState: StateType = board ? JSON.parse(board) : {
    columns: [
        {id: v1(), title: 'TODO', cards: []},
        {id: v1(), title: 'Progress', cards: []},
        {id: v1(), title: 'Testing', cards: []},
        {id: v1(), title: 'Done', cards: []},
    ]
}

const slice = createSlice({
        name: 'main',
        initialState,
        reducers: {
            changeColumnTitle(state, action: PayloadAction<{ id: string, newTitle: string }>) {
                const index = state.columns.findIndex((column) => column.id === action.payload.id)
                if (index > -1) state.columns[index].title = action.payload.newTitle
            },
            fetchColumns(state, action: PayloadAction<{ columns: Array<ColumnType> }>) {
                state.columns = action.payload.columns.map((c) => ({...c, cards: c.cards.map(card => ({...card}))}))
            },
            addCardAC(state, action: PayloadAction<{ columnId: string, cardTitle: string, cardId: string }>) {
                const index = state.columns.findIndex((column) => column.id === action.payload.columnId)
                if (index > -1) state.columns[index].cards.push({
                    id: action.payload.cardId,
                    title: action.payload.cardTitle,
                    comments: [],
                    description: ''
                })
            },
            removeCard(state, action: PayloadAction<{ cardId: string, columnId: string }>) {
                const index = state.columns.findIndex((column) => column.id === action.payload.columnId)
                if (index > -1) {
                    state.columns[index].cards = state.columns[index].cards.filter((c) => (c.id !== action.payload.cardId))
                }
            },
            changeCardTitle(state, action: PayloadAction<{ cardId: string, columnId: string, newTitle: string }>) {
                const columnIndex = state.columns.findIndex((column) => column.id === action.payload.columnId)
                if (columnIndex > -1) {
                    const cardIndex = state.columns[columnIndex].cards.findIndex((card) => card.id = action.payload.cardId)
                    if (cardIndex > -1) {
                        state.columns[columnIndex].cards[cardIndex].title = action.payload.newTitle
                    }
                }
            },
            addDescription(state, action: PayloadAction<{ cardId: string, columnId: string, description: string }>) {
                const columnIndex = state.columns.findIndex((column) => column.id === action.payload.columnId)
                if (columnIndex > -1) {
                    const cardIndex = state.columns[columnIndex].cards.findIndex((card) => card.id = action.payload.cardId)
                    if (cardIndex > -1) {
                        state.columns[columnIndex].cards[cardIndex].description = action.payload.description
                    }
                }
            },
            addComment(state, action: PayloadAction<{ cardId: string, columnId: string, newComment: string }>) {
                const columnIndex = state.columns.findIndex((column) => column.id === action.payload.columnId)
                if (columnIndex > -1) {
                    const cardIndex = state.columns[columnIndex].cards.findIndex((card) => card.id = action.payload.cardId)
                    if (cardIndex > -1) {
                        state.columns[columnIndex].cards[cardIndex].comments.push({
                            text: action.payload.newComment,
                            id: v1()
                        })
                    }
                }
            },
            changeComment(state, action: PayloadAction<{ commentId: string, cardId: string, columnId: string, comment: string }>) {
                const columnIndex = state.columns.findIndex((column) => column.id === action.payload.columnId)
                if (columnIndex > -1) {
                    const cardIndex = state.columns[columnIndex].cards.findIndex((card) => card.id = action.payload.cardId)
                    if (cardIndex > -1) {
                        const commentIndex = state.columns[columnIndex].cards[cardIndex].comments.findIndex((comment) => comment.id = action.payload.commentId)
                        if (commentIndex > -1) {
                            state.columns[columnIndex].cards[cardIndex].comments[commentIndex].text = action.payload.comment
                        }
                    }
                }
            },
            removeComment(state, action: PayloadAction<{ commentId: string, cardId: string, columnId: string }>) {
                const columnIndex = state.columns.findIndex((column) => column.id === action.payload.columnId)
                if (columnIndex > -1) {
                    const cardIndex = state.columns[columnIndex].cards.findIndex((card) => card.id = action.payload.cardId)
                    if (cardIndex > -1) {
                        state.columns[columnIndex].cards[cardIndex].comments = state.columns[columnIndex].cards[cardIndex].comments.filter((comment) => (comment.id !== action.payload.commentId))
                    }
                }
            }
        }
    }
)

export const {
    changeColumnTitle,
    fetchColumns,
    addCardAC,
    removeCard,
    changeCardTitle,
    addDescription,
    addComment,
    changeComment,
    removeComment
} = slice.actions

export const mainReducer = slice.reducer


