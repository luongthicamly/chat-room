import { combineReducers } from 'redux'
import ChatReducer from './include/chatReducer';
import UserReducer from './include/userReducer'
 const rootReducer = combineReducers({
     users: UserReducer,
     mess: ChatReducer
 })
 export default rootReducer;