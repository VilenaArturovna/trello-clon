export type CommentType = {
    id: string
    text: string
}
export type CardType = {
    id: string
    title: string
    description: string
    comments: Array<CommentType>
}
export type ColumnType = {
    id: string
    title: string
    cards: Array<CardType>
}
export type StateType = {
    columns: Array<ColumnType>
}

export enum localStorageEnum {
    userName = 'userName',
    board = 'board'
}
