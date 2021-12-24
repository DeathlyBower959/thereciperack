import Axios from 'axios'
import settings from '../settings.js'

export const getCookbooks = async (userID) => {
    if (!userID) return console.error('Missing userID')

    try {
        const res = await Axios.get(settings.SERVER_URL + '/cookbook', {
            userID,
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

export const createCookbook = async (userID, cookbook) => {
    if (!userID) return console.error('Missing userID')
    if (!cookbook) return console.error('Missing cookbook')

    try {
        const res = await Axios.post(settings.SERVER_URL + '/cookbook', {
            userID,
            cookbook,
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

export const editCookbook = async (userID, cookbookID, newCookbookData) => {
    if (!userID) return console.error('Missing userID')
    if (!cookbookID) return console.error('Missing cookbookID')
    if (!newCookbookData) return console.error('Missing newCookbookData')

    try {
        const res = await Axios.put(settings.SERVER_URL + '/cookbook', {
            userID,
            cookbookID,
            newCookbookData,
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

export const deleteCookbook = async (userID, cookbookID) => {
    if (!userID) return console.error('Missing userID')
    if (!cookbookID) return console.error('Missing cookbookID')

    try {
        const res = await Axios.delete(settings.SERVER_URL + '/cookbook', {
            data: {
                userID,
                cookbookID,
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
