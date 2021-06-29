export type StateType = {
    columns: Array<ColumnType>
}
export type ColumnType = {
    id: string
    title: string
    cards: Array<CardType>
}
export type CardType = {
    id: string
    title: string
    author: string
    description: string
    comments: Array<CommentType>
}
export type CommentType = {
    id: string
    cardId: string
    text: string
    author: string
}
export type CardsStateType = {
    [key: string]: Array<CardType>
}
export enum localStorageEnum {
    userName = 'userName',
    board = 'board'
}
