import { render, screen } from '@testing-library/react'

import MoneyTransactionCreate from './MoneyTransactionCreate'

import React from 'react'

import userEvent from '@testing-library/user-event'

describe('<MoneyTransactionCreate>', () => {

    it('should list available users that can be selected in dropdown', () => {
        const users = [
            { "id": 1, "name": "Sepp" },
            { "id": 2, "name": "Mike" }
        ]

        render(<MoneyTransactionCreate users={users}></MoneyTransactionCreate>)

        expect(screen.getByRole('combobox')).toHaveProperty("length", users.length)

    })

    it('should call onSubmit when create button is clicked', () => {
        const onSubmit = jest.fn()

        render(<MoneyTransactionCreate users={[]} onSubmit={onSubmit}></MoneyTransactionCreate>)

        userEvent.click(screen.getByText(/create/i))

        expect(onSubmit).toHaveBeenCalledTimes(1);

    })

    it('should render amount input', () => {
        render(<MoneyTransactionCreate users={[]} onSubmit={() => { }}></MoneyTransactionCreate>)
        expect(screen.getByLabelText(/amount/i)).toBeTruthy();
    })

    it('should render "I owe somebody button"', () => {
        render(<MoneyTransactionCreate users={[]} onSubmit={() => {}}></MoneyTransactionCreate>)
        expect(screen.getByText(/I owe somebody/i)).toBeTruthy();
    })

    it('should render "Somebody owes me button"', () => {
        render(<MoneyTransactionCreate users={[]} onSubmit={() => {}}></MoneyTransactionCreate>)
        expect(screen.getByText(/somebody owes me/i)).toBeTruthy();
    })

    it('should call onSubmit with the right data', () => {
        const users = [
            { "id": 1, "name": "Sepp" },
            { "id": 2, "name": "Mike" }
        ]
        const onSubmit = jest.fn()

        render(<MoneyTransactionCreate users={users} onSubmit={onSubmit}></MoneyTransactionCreate>)

        userEvent.selectOptions(screen.getByLabelText(/users/i), ["1"])
        userEvent.type(screen.getByLabelText(/amount/i), "1000")
        userEvent.click(screen.getByText(/i owe somebody/i))

        userEvent.click(screen.getByText(/create/i))

        expect(onSubmit).toHaveBeenCalledWith({
            debitorId: 0,
            creditorId: 1,
            amount: 1000
        })


    })

    it('should call onSubmit with the right data when somebody owes someone', () => {
        const users = [
            { "id": 1, "name": "Sepp" },
            { "id": 2, "name": "Mike" }
        ]
        const onSubmit = jest.fn()

        render(<MoneyTransactionCreate users={users} onSubmit={onSubmit}></MoneyTransactionCreate>)

        userEvent.selectOptions(screen.getByLabelText(/users/i), ["2"])
        userEvent.type(screen.getByLabelText(/amount/i), "2000")
        userEvent.click(screen.getByText(/somebody owes me/i))

        userEvent.click(screen.getByText(/create/i))

        expect(onSubmit).toHaveBeenCalledWith({
            debitorId: 2,
            creditorId: 0,
            amount: 2000
        })

    })

    it('should call onSubmit with the right data when somebody owes someone', () => {
        const users = [
            { "id": 1, "name": "Sepp" },
            { "id": 2, "name": "Mike" }
        ]
        const onSubmit = jest.fn()

        render(<MoneyTransactionCreate users={users} onSubmit={onSubmit}></MoneyTransactionCreate>)

        userEvent.selectOptions(screen.getByLabelText(/users/i), ["2"])
        userEvent.type(screen.getByLabelText(/amount/i), "20.02")
        userEvent.click(screen.getByText(/somebody owes me/i))

        userEvent.click(screen.getByText(/create/i))

        expect(onSubmit).toHaveBeenCalledWith({
            debitorId: 2,
            creditorId: 0,
            amount: 20.02
        })
    })



})