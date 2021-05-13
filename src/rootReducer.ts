import { combineReducers } from 'redux'


const initialState: object = {
    name:'vasa',
    age:25
};
export const rootReducer = (state=initialState, action:object) => {
    return state
};
