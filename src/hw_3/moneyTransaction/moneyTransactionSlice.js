import MoneyTransactionActions from './actionTypes'

const initialState = [

]

function nextMoneyTransactionId(moneyTransactions) {
    const maxId = moneyTransactions.reduce((maxId, moneyTx) => Math.max(moneyTx.id, maxId), -1)
    return maxId + 1
}

const moneyTransactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case MoneyTransactionActions.fetch: {
            const moneyTransactions = action.payload
            return [
                ...state,
                ...moneyTransactions
            ]
        }
        case MoneyTransactionActions.create: {
            const newMoneyTransaction = {...action.payload, id:nextMoneyTransactionId(state), paidAt: null }
            return [
                ...state,
                newMoneyTransaction
            ]
        }
        case MoneyTransactionActions.update: {
            const updatePayload = action.payload
            const moneyTransactionToUpdate = state.find((moneyTransaction) => moneyTransaction.id === updatePayload.id)

            if (moneyTransactionToUpdate === undefined) {
                return state
            }

            moneyTransactionToUpdate.paidAt = updatePayload.paidAt
            const updatedState = [...state.filter((moneyTransaction) => moneyTransaction.id !== moneyTransactionToUpdate.id), moneyTransactionToUpdate]
            return updatedState
        }

        default:
            return state
    }
}

export default moneyTransactionReducer
