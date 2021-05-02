import MoneyTransactionActions from './actionTypes'

const initialState = [

]

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
            const newMoneyTransaction = action.payload
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
