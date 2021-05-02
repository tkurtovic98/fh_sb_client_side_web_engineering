const initialState = [

]

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'users/fetched': {
            const users = action.payload
            return [
                ...state,
                ...users
            ]
        }

        default:
            return state
    }
}

export default userReducer
