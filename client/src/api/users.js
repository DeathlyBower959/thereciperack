import Axios from 'axios'
import settings from '../settings.js'

export const getUser = async (email, password) => {
    if (!email) return console.error('Missing email')
    if (!password) return console.error('Missing password')

    try {
        const res = await Axios.get(settings.SERVER_URL + '/users', {
            params: {
                email,
                password,
            },
        })

        return res
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return error.response
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js

            return error.request
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message)
            return error
        }
    }
}

export const getUserHashed = async (email, hashedPass) => {
    if (!email) return console.error('Missing email')
    if (!hashedPass) return console.error('Missing hashedPass')

    try {
        const res = await Axios.get(settings.SERVER_URL + '/users', {
            params: {
                email,
                hashedPass,
            },
        })

        return res
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return error.response
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js

            return error.request
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message)
            return error
        }
    }
}

export const createUser = async (name, email, password) => {
    if (!name) return console.error('Missing name')
    if (!email) return console.error('Missing email')
    if (!password) return console.error('Missing password')

    try {
        const res = await Axios.post(settings.SERVER_URL + '/users', {
            name,
            email,
            password,
        })

        return res
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return error.response
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js

            return error.request
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message)
            return error
        }
    }
}

export const regenJWTToken = async (userID) => {
    if (!userID) return console.error('Missing userID')

    try {
        const res = await Axios.get(settings.SERVER_URL + '/users/regenToken', {
            params: {
                userID
            }
        })

        return res
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return error.response
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js

            return error.request
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message)
            return error
        }
    }
}

export const editUser = async (userID, oldPass, newUser) => {
    if (!userID) return console.error('Missing userID')
    if (!newUser) return console.error('Missing newUser')

    try {
        const res = await Axios.put(settings.SERVER_URL + '/users', {
            userID,
            oldPass, 
            newUser,
        })

        return res
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return error.response
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js

            return error.request
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message)
            return error
        }
    }
}

export const deleteUser = async (userID) => {
    if (!userID) return console.error('Missing userID')

    try {
        const res = Axios.delete(settings.SERVER_URL + '/users', {
            data: { userID },
        })

        return res
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return error.response
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js

            return error.request
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message)
            return error
        }
    }
}
