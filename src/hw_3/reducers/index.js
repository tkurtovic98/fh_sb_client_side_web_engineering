import { combineReducers } from 'redux'

import moneyTransactionReducer from '../moneyTransaction/moneyTransactionSlice' 
import userReducer from '../user/userSlice' 


const rootReducer = combineReducers({
  moneyTransaction: moneyTransactionReducer,
  user: userReducer
})

export default rootReducer