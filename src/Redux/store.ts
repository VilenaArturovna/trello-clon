import {createStore} from "redux";
import {mainReducer} from "./main-reducer";

export const store = createStore(mainReducer)