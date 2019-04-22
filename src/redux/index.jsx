import { combineReducers, createStore } from "redux";
import Reducers from './reducers';
import action from './action'

const AllReducers = (state = null, action) => {
    console.log(action.type, state)
    switch (action.type) {

    }
}

let store = createStore(AllReducers)

export default store
