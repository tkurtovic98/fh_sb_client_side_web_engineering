import { buildFailingFakeFetch, buildSuccessfullFakeFetch } from '../util/fakeFetch'

import { fetchMoneyTransactions } from './moneyTransactionActionCreators'

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
        const error = {error: 404}

        const fetch = buildFailingFakeFetch(error)

        await fetchMoneyTransactions()(dispatch, undefined, { fetch })

        expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: 'moneyTransaction/failed',
            payload: error
        })

    })


})