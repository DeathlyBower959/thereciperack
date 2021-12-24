import Axios from 'axios'
import settings from '../settings.js'

export const sendEmail = async (to, subject, html) => {
    if (!to) return console.error('Missing to')
    if (!subject) return console.error('Missing subject')
    if (!html) return console.error('Missing html')

    try {
        const res = await Axios.get(settings.SERVER_URL + '/email', {
            params: {
                to,
                subject,
                html,
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
