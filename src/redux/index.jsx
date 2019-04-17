import {createStore} from "redux";
import Msgsnd from './reducers'

console.log(Msgsnd)
const TestData = (state = {}, action) => {
    switch (action.type) {
        case 'INCREMENT':   //增加数据
            one('www');
        case 'DECREMENT':   //删除数据
            two('llll');
        default:
            return state;
    }
}

let store = createStore(TestData)

export default store
