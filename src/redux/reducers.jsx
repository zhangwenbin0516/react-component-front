import {combineReducers } from "redux";
import initialState from './state'

const lists = (state = initialState, action) => {
    switch (action.type) {
        case 1:
            return 1;
        default:
            console.log(action)
            return state
    }
}

export default combineReducers({
    lists
})
