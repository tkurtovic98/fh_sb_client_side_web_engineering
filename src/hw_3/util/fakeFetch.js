export const buildSuccessfullFakeFetch = (response) => {
    return jest.fn().mockReturnValue(Promise.resolve({
        json: () => Promise.resolve(response)
    }))
}

export const buildFailingFakeFetch = (error) => {
    return jest.fn().mockReturnValue(Promise.reject({
        json: () => Promise.resolve(error)
    }))
}