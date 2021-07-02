import {mainReducer} from "./main-reducer";
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({reducer: mainReducer})