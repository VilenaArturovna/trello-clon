import {CardsStateType} from "./state";

const initialState: CardsStateType = {
    [1]: [{id: 1, title: 'first', author: 'Alex', description: '', commentsCount: 0, comments: []}],
    [2]: [{id: 1, title: 'second', author: 'Mark', description: '', commentsCount: 0, comments: []}],
    [3]: [{id: 1, title: 'third', author: 'Nikita', description: '', commentsCount: 0, comments: []}],
    [4]: [{id: 1, title: 'empty', author: 'Artem', description: '', commentsCount: 0, comments: []}],
}

export const cardReducer = (state = initialState, action: ActionsType) => {

}

type ActionsType =
    ReturnType<typeof removeCard> |
    ReturnType<typeof addCard> |
    ReturnType<typeof changeCardTitle> |
    ReturnType<typeof addDescription> |
    ReturnType<typeof changeDescription> |
    ReturnType<typeof removeDescription> |
    ReturnType<typeof addComment> |
    ReturnType<typeof changeComment> |
    ReturnType<typeof removeComment>

export const removeCard = (cardId: number, columnId: number) => ({
    type: 'REMOVE-CARD', cardId, columnId
} as const)
export const addCard = (columnId: number) => ({
    type: 'ADD-CARD', columnId
} as const)
export const changeCardTitle = (cardId: number, columnId: number, newTitle: string) => ({
    type: 'CHANGE-CARD-TITLE', cardId, columnId, newTitle
} as const)
export const addDescription = (cardId: number, columnId: number, description: string) => ({
    type: 'ADD-DESCRIPTION', cardId, columnId, description
} as const)
export const changeDescription = (cardId: number, columnId: number, newDescription: string) => ({
    type: 'CHANGE-DESCRIPTION', cardId, columnId, newDescription
} as const)
export const removeDescription = (cardId: number, columnId: number) => ({
    type: 'REMOVE-DESCRIPTION', cardId, columnId
} as const)
export const addComment = (cardId: number, columnId: number, comment: string) => ({
    type: 'ADD-COMMENT', cardId, columnId, comment
} as const)
export const changeComment = (commentId: number, cardId: number, columnId: number, newValue: string) => ({
    type: 'CHANGE-COMMENT', commentId, cardId, columnId, newValue
} as const)
export const removeComment = (commentId: number, cardId: number, columnId: number) => ({
    type: 'REMOVE-COMMENT', commentId, cardId, columnId
} as const)