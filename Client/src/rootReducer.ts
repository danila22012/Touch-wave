import { combineReducers } from "redux";
import { contactsReducer } from "./reducers/contactsReducer";
import { dialogReducer } from "./reducers/dialogReducer";

export const rootReducer = combineReducers({ contactsReducer, dialogReducer });
