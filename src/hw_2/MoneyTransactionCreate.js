import React from 'react'
import PropTypes from 'prop-types'

const MoneyTransactionCreate = ({users, onSubmit}) => {
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

            <button onClick={onSubmit}>create</button>
        </>
    )
};

MoneyTransactionCreate.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSubmit: PropTypes.func
};

export default MoneyTransactionCreate;
