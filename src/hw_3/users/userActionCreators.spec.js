import { fetchUsers } from './userActionCreators'
import UserActionType from './userActionTypes'


const buildSuccessfullFakeFetch = (response) => {
    return jest.fn().mockReturnValue(Promise.resolve({
        json: () => Promise.resolve(response)
    }))
}

const buildFailingFakeFetch = (error) => {
    return jest.fn().mockReturnValue(Promise.reject({
        json: () => Promise.resolve(error)
    }))
}

describe('fetch users action creator', () => {
    it('should call dispatch function once with type and payload', async () => {
        const users = [{ "id": 1, "name": "Sepp" }]
        const dispatch = jest.fn()
        const fetch = buildSuccessfullFakeFetch(users)
        await fetchUsers()(dispatch, undefined, { fetch })
        expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: UserActionType.fetched,
            payload: users
        })
    })

    it('should call error dispatch function once with error as payload', async () => {
        const dispatch = jest.fn()
        const error = {error: 404}
        const fetch = buildFailingFakeFetch(error)
        await fetchUsers()(dispatch, undefined, {fetch})
        expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: UserActionType.failed,
            payload: error
        })


    })

})