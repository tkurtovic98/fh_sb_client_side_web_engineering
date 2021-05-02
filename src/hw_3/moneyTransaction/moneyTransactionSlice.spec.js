import MoneyTransactionActions from './actionTypes'
import moneyTransactionReducer from './moneyTransactionSlice'

describe('moneyTransactionReducer', () => {

    it('should return empty moneyTransaction array when no moneyTransactions were fetched', async () => {
        const action = {
            type: MoneyTransactionActions.fetch,
            payload: []
        }
        const result = moneyTransactionReducer(undefined, action)
        expect(result).toHaveLength(0)
    })


    it('should return moneyTransaction array with 2 elements', async () => {
        const moneyTransactions =
            [
                { "id": 1, "creditorId": 1, "debitorId": 2, "amount": 10.00, "paidAt": null },
                { "id": 2, "creditorId": 3, "debitorId": 1, "amount": 11.20, "paidAt": "2000-01-01T00:00:00+01+00" },
            ]

        const action = {
            type: MoneyTransactionActions.fetch,
            payload: moneyTransactions
        }

        const result = moneyTransactionReducer(undefined, action)

        expect(result).toEqual(moneyTransactions)
    })

    it('should add fetched moneyTransactions to state', async () => {
        const initialState =
            [
                { "id": 4, "creditorId": 4, "debitorId": 6, "amount": 12.00, "paidAt": null },
            ]

        const moneyTransactions =
            [
                { "id": 1, "creditorId": 1, "debitorId": 2, "amount": 10.00, "paidAt": null },
                { "id": 2, "creditorId": 3, "debitorId": 1, "amount": 11.20, "paidAt": "2000-01-01T00:00:00+01+00" },
                { "id": 3, "creditorId": 4, "debitorId": 6, "amount": 12.00, "paidAt": null },
            ]

        const action = {
            type: MoneyTransactionActions.fetch,
            payload: moneyTransactions
        }

        const result = moneyTransactionReducer(initialState, action)

        expect(result).toEqual([...initialState, ...moneyTransactions])
    })

    it('should update state when new moneyTransaction is created', async () => {
        const initialState = [
            { "id": 1, "creditorId": 1, "debitorId": 2, "amount": 10.00, "paidAt": null },
            { "id": 2, "creditorId": 3, "debitorId": 1, "amount": 11.20, "paidAt": "2000-01-01T00:00:00+01+00" },
            { "id": 3, "creditorId": 4, "debitorId": 6, "amount": 12.00, "paidAt": null }
        ]

        const newMoneyTransaction = { "id": 4, "creditorId": 2, "debitorId": 5, "amount": 132124.123, "paidAt": null }


        const action = {
            type: MoneyTransactionActions.create,
            payload: newMoneyTransaction
        }

        const result = moneyTransactionReducer(initialState, action)

        expect(result).toEqual([...initialState, newMoneyTransaction])
    })

    it('should update moneyTransaction paidAt attribute', async () => {

        const initialState = [
            { "id": 1, "creditorId": 1, "debitorId": 2, "amount": 10.00, "paidAt": null },
            { "id": 2, "creditorId": 3, "debitorId": 1, "amount": 11.20, "paidAt": "2000-01-01T00:00:00+01+00" },
            { "id": 3, "creditorId": 4, "debitorId": 6, "amount": 12.00, "paidAt": null }
        ]

        const updatePayload = {"id": 1, "paidAt": "2020-01-01T00:00:00+01+00"}

        const updatedState = [
            { "id": 2, "creditorId": 3, "debitorId": 1, "amount": 11.20, "paidAt": "2000-01-01T00:00:00+01+00" },
            { "id": 3, "creditorId": 4, "debitorId": 6, "amount": 12.00, "paidAt": null },
            { "id": 1, "creditorId": 1, "debitorId": 2, "amount": 10.00, "paidAt": "2020-01-01T00:00:00+01+00" },
        ]

        const action = {
            type: MoneyTransactionActions.update,
            payload: updatePayload
        }

        const result = moneyTransactionReducer(initialState, action)

        expect(result).toEqual(updatedState)
    })

    it('should return last state when moneyTransaction with given id doesnt exist', async () => {

        const initialState = [
            { "id": 1, "creditorId": 1, "debitorId": 2, "amount": 10.00, "paidAt": null },
            { "id": 2, "creditorId": 3, "debitorId": 1, "amount": 11.20, "paidAt": "2000-01-01T00:00:00+01+00" },
            { "id": 3, "creditorId": 4, "debitorId": 6, "amount": 12.00, "paidAt": null }
        ]

        const updatePayload = {"id": 0, "paidAt": "2020-01-01T00:00:00+01+00"}

        const action = {
            type: MoneyTransactionActions.update,
            payload: updatePayload
        }

        const result = moneyTransactionReducer(initialState, action)

        expect(result).toEqual(initialState)
    })


})
