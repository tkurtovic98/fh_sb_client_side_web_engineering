import React from 'react'

import PropTypes from 'prop-types'

const MoneyTransactionList = ({moneyTransactions, onMoneyTransactionPaid}) => {

    const currentDateISOString = () => {
        return new Date().toISOString();
    }

    return (
        <>
            <ul>
                {moneyTransactions.map((transaction) => {
                    return (
                        <li key={transaction.id}>
                            <p>amount:{transaction.amount}, paidAt:{transaction.paidAt}</p>
                            {transaction.paidAt === null ? <button onClick={() => onMoneyTransactionPaid(
                                {
                                    id: transaction.id,
                                    paidAt: currentDateISOString()
                                }
                            )}>Paid</button> : ''}
                        </li>
                    )
                })}
                 
            </ul>



        </>
    )
}

MoneyTransactionList.propTypes = {
    moneyTransactions: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMoneyTransactionPaid: PropTypes.func
}

export default MoneyTransactionList
