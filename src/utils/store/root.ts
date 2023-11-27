import {combineReducers} from "redux";
import {utilsReducer} from "./utils-store/utils-reducer";

export const rootReducer = combineReducers({
    utilsStore: utilsReducer,
})