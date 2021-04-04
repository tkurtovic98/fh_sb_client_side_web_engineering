import React from 'react'
import PropTypes from 'prop-types'

const MoneyTransactionCreate = ({users}) => {
    return (
        <>
            <select name="users">
                {users.map((user) => {
                    return (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    )
                })}

            </select>
        </>
    )
};

MoneyTransactionCreate.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default MoneyTransactionCreate;
