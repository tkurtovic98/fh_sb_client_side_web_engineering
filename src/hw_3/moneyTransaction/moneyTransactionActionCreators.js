
export const fetchMoneyTransactions = () => async (dispatch, _, { fetch }) => {

    try {
        const moneyTransactionsResponse = await fetch('http://localhost:3001/moneyTransactions')
            .then((response) => response.json())
        dispatch({ type: 'moneyTransaction/fetched', payload: moneyTransactionsResponse })
    } catch (error) {
        dispatch({ type: 'moneyTransaction/failed', payload: await error.json() })
    }

}

const isInt = (value) => {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}

const isNotNullAndIsInt = (val) => {
    return val !== null && isInt(val)
}

const isFloat = (val) => {
    return !isNaN(val) && parseFloat(Number(val)) == val
}

const isNotNullAndIsFloatOrInt = (val) => {
    return val !== null && (isFloat(val) || isInt(val))
}

const isIsoDate = (str) => {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
    var d = new Date(str);
    return d.toISOString() === str;
}

const isNullOrDateTime = (val) => {
    return val === null || isIsoDate(val)
}

const isValid = (moneyTransaction) => {

    return isNotNullAndIsInt(moneyTransaction.id) &&
        isNotNullAndIsInt(moneyTransaction.creditorId) &&
        isNotNullAndIsInt(moneyTransaction.debitorId) &&
        isNotNullAndIsFloatOrInt(moneyTransaction.amount) &&
        isNullOrDateTime(moneyTransaction.paidAt)

}

export const createMoneyTransaction = () => async (dispatch, moneyTransaction) => {

    if (isValid(moneyTransaction)) {
        dispatch({
            type: 'moneyTransaction/create',
            payload: moneyTransaction
        })
    } else {
        dispatch({
            type: 'moneyTransaction/error',
            payload: { msg: "MoneyTransaction is not valid" }
        })
    }




}


export const updateMoneyTransaction = () => async (dispatch, updatePayload) => {

    if (updatePayload.id !== null && updatePayload.id !== undefined && isInt(updatePayload.id)) {
        dispatch({
            type: 'moneyTransaction/update',
            payload: updatePayload
        })
    } else {
        dispatch({
            type: 'moneyTransaction/error',
            payload: { msg: "MoneyTransaction update is not valid" }
        })
    }


}

