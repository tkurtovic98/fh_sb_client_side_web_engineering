
export const fetchMoneyTransactions = () => async (dispatch, _, { fetch }) => {

    try {
        const moneyTransactionsResponse = await fetch('http://localhost:3001/moneyTransactions')
            .then((response) => response.json())
        dispatch({ type: 'moneyTransaction/fetched', payload: moneyTransactionsResponse })
    } catch (error) {
        dispatch({ type: 'moneyTransaction/failed', payload: await error.json() })
    }

}



