import { render, screen } from '@testing-library/react'

import MoneyTransactionCreate from './MoneyTransactionCreate'

import React from 'react'

describe('<MoneyTransactionCreate>', () => {

    it('should list available users that can be selected in dropdown', () => {
        const users = [
            { "id": 1, "name": "Sepp" },
            { "id": 2, "name": "Mike" }
        ]

        render(<MoneyTransactionCreate users={users}></MoneyTransactionCreate>)

        expect(screen.getByRole('combobox')).toHaveProperty("length", users.length)

    })



})