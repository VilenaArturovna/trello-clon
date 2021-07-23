import {createSelector} from "reselect";
import {ColumnType, StateType} from "./state";

const selectColumns = (state: StateType) => state.columns

export const getColumns = createSelector<StateType, Array<ColumnType>, Array<ColumnType>>(
    selectColumns,
    columns => columns
)

const selectUserName = (state: StateType) => state.userName

export const getUserName = createSelector<StateType, string, string>(
    selectUserName,
    userName => userName
)
