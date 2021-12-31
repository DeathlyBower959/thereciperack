import Axios from 'axios'
import settings from '../settings'

export const shortenURL = async (longUrl) => {
    if (!longUrl) return console.error('Missing longUrl')

    try {
        const res = await Axios.post(settings.SERVER_URL + '/urls/create', {
            longUrl,
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

export const getURL = async (code) => {
    if (!code) return console.error('Missing code')

    try {
        const res = await Axios.get(settings.SERVER_URL + '/urls/', {
            params: {
                code
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
