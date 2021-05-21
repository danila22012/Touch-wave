import { combineReducers } from "redux";
import { contactsReducer } from "./reducers/contactsReducer";
import { dialogReducer } from "./reducers/dialogReducer";
import { joinReducer } from "./reducers/joinReducer";

export const rootReducer = combineReducers({ contactsReducer, dialogReducer,joinReducer });
