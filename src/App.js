import React from 'react'

import MoneyTransactionCreate from './hw_3/MoneyTransactionCreate'
import MoneyTransactionList from './hw_3/MoneyTransactionList'

import { fetchMoneyTransactions, createMoneyTransaction, updateMoneyTransaction } from './hw_3/moneyTransaction/moneyTransactionActionCreators'
import { fetchUsers } from './hw_3/user/userActionCreators'

import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

const App = () => {

    const moneyTransactions = useSelector((state) => state.moneyTransactions)
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        fetchMoneyTransactions(dispatch, undefined, { fetch: window.fetch })
        fetchUsers(dispatch, undefined, { fetch: window.fetch })
    }, [])


    return (
        <div>
            <MoneyTransactionList
                moneyTransactions={moneyTransactions}
                onMoneyTransactionPaid={(updatePayload) =>
                    updateMoneyTransaction(dispatch, updatePayload)
                }
            >
            </MoneyTransactionList>

            <MoneyTransactionCreate
                users={users}
                onSubmit={(newMoneyTransaction) => {
                    createMoneyTransaction(dispatch, newMoneyTransaction)
                }}
            ></MoneyTransactionCreate>



        </div >
    )
}


export default App