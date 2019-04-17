import {createStore} from "redux";
import Reducers from './reducers'

const TestData = (state = {}, action) => {
    try {
        return Reducers[action.type]()
    } catch (e) {
        return state
    }
}

let store = createStore(TestData)

export default store
