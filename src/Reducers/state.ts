export type StateType = {
    columns: Array<ColumnType>
}
export type ColumnType = {
    id: number
    title: string
    cards: Array<CardType>
}
export type CardType = {
    id: number
    title: string
    author: string
    description: string
    comments: Array<CommentType>
    commentsCount: number
}
export type CommentType = {
    id: number
    cardId: number
    text: string
    author: string
}
export type CardsStateType = {
    [key: number]: Array<CardType> // объект может иметь свойства-ключи, которые строковые
    // (а ключи вообще в объекте и не могут быть иными), а вот значения этих св-в - это массив объектов TaskType
}
