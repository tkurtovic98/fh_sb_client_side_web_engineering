import React from 'react'

import PropTypes from 'prop-types'

const MoneyTransactionList = ({moneyTransactions}) => {
    return (
        <>
            <ul>
                {moneyTransactions.map((transaction) => {
                    return (
                        <li key={transaction.id}>
                            <p>amount:{transaction.amount}, paidAt:{transaction.paidAt}</p>
                        </li>
                    )
                })}
                
            </ul>



        </>
    )
}

MoneyTransactionList.propTypes = {
    moneyTransactions: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default MoneyTransactionList
