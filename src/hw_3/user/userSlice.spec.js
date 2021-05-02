import userReducer from './userSlice'

describe('userReducer', () => {

    it('should set state with empty array when no users where fetched', async () => {

        const fetchedUsers = []

        const action = {
            type: 'users/fetched',
            payload: fetchedUsers
        }

        const result = userReducer(undefined, action)
        expect(result).toHaveLength(0)

    })

    it('should set state with array fetched users', async () => {

        const fetchedUsers = [
            { "id": 1, "name": "Sepp" },
            { "id": 2, "name": "Mike" }
        ]

        const action = {
            type: 'users/fetched',
            payload: fetchedUsers
        }

        const result = userReducer(undefined, action)
        expect(result).toHaveLength(fetchedUsers.length)

    })

    it('should add fetched users to state ', async () => {

        const initialState = [
            { "id": 1, "name": "Sepp" },
            { "id": 2, "name": "Mike" }
        ]

        const fetchedUsers = [
            { "id": 3, "name": "Klepp" },
            { "id": 4, "name": "Moike" }
        ]

        const action = {
            type: 'users/fetched',
            payload: fetchedUsers
        }

        const result = userReducer(initialState, action)
        expect(result).toEqual([...initialState, ...fetchedUsers])
    })
})
