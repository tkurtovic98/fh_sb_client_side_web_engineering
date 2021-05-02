
import UserActionType from './userActionTypes'

export const fetchUsers = () => async (dispatch, _, { fetch }) => {

    try {
        const userResponse = await fetch('http://localhost:3001/users')
            .then((response) => response.json())

        dispatch({ type: UserActionType.fetched, payload: userResponse })
    } catch(error) {
        dispatch({type: UserActionType.failed, payload: await error.json()})
    }
    
}
