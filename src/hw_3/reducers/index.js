import { combineReducers } from 'redux'

import moneyTransactionReducer from '../moneyTransaction/moneyTransactionSlice' 
import userReducer from '../user/userSlice' 


const rootReducer = combineReducers({
  moneyTransactions: moneyTransactionReducer,
  users: userReducer
})

export default rootReducer