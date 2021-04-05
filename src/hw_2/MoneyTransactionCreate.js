import React from 'react'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

const MoneyTransactionCreate = ({ users, onSubmit }) => {
    const usersEmpty = users.length === 0;

    const [selectedUserId, setSelectedUserId] = useState(usersEmpty ? 0 : users[0].id)
    const [amount, setAmount] = useState('');

    const [myId] = useState(0);
    const [someoneOwesMe, setSomeoneOwesMe] = useState(true);


    useEffect(() => { }, [myId])

    return (
        <form onSubmit={(event) => {
            event.preventDefault()
            onSubmit({
                creditorId: someoneOwesMe ? myId : selectedUserId,
                debitorId: someoneOwesMe ? selectedUserId : myId,
                amount: parseFloat(amount)
            })
        }}>

            <div htmlFor="who-pays">
                <button onClick={(event) => {
                    event.preventDefault();
                    setSomeoneOwesMe(false);
                }
                }
                >I owe somebody
                </button>

                <button onClick={(event) => {
                    event.preventDefault();
                    setSomeoneOwesMe(true);
                }
                }
                >Somebody owes me
                </button>
            </div>


            <label htmlFor="users">Users</label>
            <select id="users" value={selectedUserId} onChange={(event) => {
                event.preventDefault();
                setSelectedUserId(parseInt(event.target.value));
            }}>
                {users.map((user) => {
                    return (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    )
                })}
            </select>

            <label htmlFor="amount">
                Amount
                <input id="amount" value={amount} onChange={(event) => {
                    event.preventDefault();
                    setAmount(event.target.value);
                }}>
                </input>
            </label>

            <button type="submit">create</button>
        </form >
    )
};

MoneyTransactionCreate.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSubmit: PropTypes.func
};

export default MoneyTransactionCreate;
