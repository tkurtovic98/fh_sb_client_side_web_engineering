import { render, screen } from '@testing-library/react'

import React from 'react'

import MoneyTransactionList from './MoneyTransactionList'

describe('<MoneyTransactionList>', () => {

    it('should render given money transactions', () => {
        const moneyTransactions =
            [
                { "id": 1, "creditorId": 1, "debitorId": 2, "amount": 10.00, "paidAt": null },
                { "id": 2, "creditorId": 3, "debitorId": 1, "amount": 11.20, "paidAt": "2000-01-01T00:00:00+01+00" },
            ]

        render(<MoneyTransactionList moneyTransactions={moneyTransactions}></MoneyTransactionList>)

        expect(screen.getAllByRole('listitem')).toHaveProperty("length", moneyTransactions.length);

        moneyTransactions.forEach((transaction) => {
            expect(screen.findByAltText(`amount:${transaction.amount}, paidAt:${transaction.paidAt}`)).toBeTruthy()
        })

    })

})