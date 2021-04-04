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



})