import { buildFailingFakeFetch, buildSuccessfullFakeFetch } from '../util/fakeFetch'

import { fetchMoneyTransactions, createMoneyTransaction, updateMoneyTransaction } from './moneyTransactionActionCreators'

describe('fetchMoneyTransactions action creator', () => {

    it('should call dispatch with type moneyTransaction/fetched  and payload', async () => {
        const moneyTransactions = [
            { "id": 1, "creditorId": 1, "debitorId": 2, "amount": 10.00, "paidAt": null },
            { "id": 2, "creditorId": 3, "debitorId": 1, "amount": 11.20, "paidAt": "2000-01-01T00:00:00+01+00" },
        ]

        const dispatch = jest.fn()

        const fetch = buildSuccessfullFakeFetch(moneyTransactions)

        await fetchMoneyTransactions()(dispatch, undefined, { fetch })

        expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: 'moneyTransaction/fetched',
            payload: moneyTransactions
        })

    })

    it('should call dispatch with type moneyTransaction/failed and error', async () => {
        const dispatch = jest.fn()
        const error = { error: 404 }

        const fetch = buildFailingFakeFetch(error)

        await fetchMoneyTransactions()(dispatch, undefined, { fetch })

        expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: 'moneyTransaction/failed',
            payload: error
        })

    })


})


describe('createMoneyTransaction action creator', () => {

    it('should call dispatch with type moneyTransaction/create  and payload', async () => {

        const moneyTransactionToCreate = { "id": 1, "creditorId": 4, "debitorId": 2, "amount": 15.00, "paidAt": null }

        const dispatch = jest.fn()

        await createMoneyTransaction()(dispatch, moneyTransactionToCreate)

        expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: 'moneyTransaction/create',
            payload: moneyTransactionToCreate
        })
    })

    it('should call dispatch with type moneyTransaction/failed and error message if moneyTransaction id is null', async () => {

        const moneyTransactionToCreate = { "id": null, "creditorId": 4, "debitorId": 2, "amount": 15.00, "paidAt": null }

        const error = { msg: "MoneyTransaction is not valid" }
        const dispatch = jest.fn()

        await createMoneyTransaction()(dispatch, moneyTransactionToCreate)

        expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: 'moneyTransaction/error',
            payload: error
        })
    })

    it('should call dispatch with type moneyTransaction/failed and error message if moneyTransaction creditorId is null', async () => {

        const moneyTransactionToCreate = { "id": 1, "creditorId": null, "debitorId": 2, "amount": 15.00, "paidAt": null }

        const error = { msg: "MoneyTransaction is not valid" }
        const dispatch = jest.fn()

        await createMoneyTransaction()(dispatch, moneyTransactionToCreate)

        expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: 'moneyTransaction/error',
            payload: error
        })
    })


    it('should call dispatch with type moneyTransaction/failed and error message if moneyTransaction debitorId is null', async () => {

        const moneyTransactionToCreate = { "id": 1, "creditorId": 2, "debitorId": null, "amount": 15.00, "paidAt": null }

        const error = { msg: "MoneyTransaction is not valid" }
        const dispatch = jest.fn()

        await createMoneyTransaction()(dispatch, moneyTransactionToCreate)

        expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: 'moneyTransaction/error',
            payload: error
        })
    })
})

describe('moneyTransaction/update action creator', () => {

    it('should update money transaction with given id', async () => {

        const updatePayload = { "id": 1, "paidAt": "2000-01-01T00:00:00+01+00" }

        const dispatch = jest.fn()

        await updateMoneyTransaction()(dispatch, updatePayload)

        expect(dispatch).toHaveBeenNthCalledWith(1,
            {
                type: 'moneyTransaction/update',
                payload: updatePayload
            })

    })


})