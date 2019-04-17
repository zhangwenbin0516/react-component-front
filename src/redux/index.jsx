import {createStore} from "redux";
import Msgsnd from './reducers'

console.log()
const TestData = (state = {}, action) => {
    Msgsnd[action.type]();
}

let store = createStore(TestData)

export default store
