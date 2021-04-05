import { jest } from '@jest/globals'
import { render, screen } from '@testing-library/react'

import React from 'react'

import MoneyTransactionList from './MoneyTransactionList'

import userEvent from '@testing-library/user-event'


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

    it('should render "Paid" button next to each transaction where paid is null', () => {
        const moneyTransactions =
            [
                { "id": 1, "creditorId": 1, "debitorId": 2, "amount": 10.00, "paidAt": null },
                { "id": 2, "creditorId": 3, "debitorId": 1, "amount": 11.20, "paidAt": "2000-01-01T00:00:00+01+00" },
            ]

        render(<MoneyTransactionList moneyTransactions={moneyTransactions}></MoneyTransactionList>)

        expect(screen.getAllByRole('button', { name: /paid/i })).toHaveProperty("length", 1);

    })

    it('should call paid function when paid button is clicked', () => {
        const moneyTransactions =
            [
                { "id": 1, "creditorId": 1, "debitorId": 2, "amount": 10.00, "paidAt": null },
                { "id": 2, "creditorId": 3, "debitorId": 1, "amount": 11.20, "paidAt": "2000-01-01T00:00:00+01+00" },
            ]

        const onPaid = jest.fn();

        render(<MoneyTransactionList moneyTransactions={moneyTransactions} onMoneyTransactionPaid={onPaid}></MoneyTransactionList>)

        userEvent.click(screen.getByRole('button'))

        expect(onPaid).toHaveBeenCalledTimes(1);

    })

    it('should call onMoneyTransactionPaid with the right data', () => {
        const moneyTransactions =
            [
                { "id": 1, "creditorId": 1, "debitorId": 2, "amount": 10.00, "paidAt": null },
                { "id": 2, "creditorId": 3, "debitorId": 1, "amount": 11.20, "paidAt": "2000-01-01T00:00:00+01+00" },
            ]

        const getCurrentDateISOString = () => new Date().toISOString();

        const currentDate = new Date('2019-05-14T11:01:58.135Z');
        let realDate = Date;
        global.Date = class extends Date {
            constructor() {
                return currentDate;
            }
        };

        const onPaid = jest.fn();

        render(<MoneyTransactionList moneyTransactions={moneyTransactions} onMoneyTransactionPaid={onPaid}></MoneyTransactionList>)

        userEvent.click(screen.getByRole('button'))

        expect(onPaid).toHaveBeenCalledWith({
            id: 1,
            paidAt: getCurrentDateISOString()
        });

        global.Date = realDate;

    })


})