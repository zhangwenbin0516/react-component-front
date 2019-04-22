import { combineReducers } from "redux";
import CacheData from './state'

const getUserInfo = (state= CacheData, action) => {

}

const AllReducers = {
    getUserInfo
}

const ReadyReducers = combineReducers(AllReducers)

export default ReadyReducers
