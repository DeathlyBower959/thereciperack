import Axios from 'axios'
import settings from '../settings.js'

export const getSettings = async (userID) => {
    if (!userID) return console.error('Missing userID')

    try {
        const res = await Axios.get(settings.SERVER_URL + '/settings', {
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

export const editSettings = async (userID, newSettingData) => {
    if (!userID) return console.error('Missing userID')
    if (!newSettingData) return console.error('Missing newSettingData')

    try {
        const res = await Axios.put(settings.SERVER_URL + '/settings', {
            userID,
            newSettingData,
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

export const createTheme = async (userID, newTheme) => {
    if (!userID) return console.error('Missing userID')
    if (!newTheme) return console.error('Missing newTheme')

    try {
        const res = await Axios.post(settings.SERVER_URL + '/settings/theme', {
            userID,
            newTheme,
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

export const editTheme = async (userID, newThemeData, themeID) => {
    if (!userID) return console.error('Missing userID')
    if (!newThemeData) return console.error('Missing newThemeData')
    if (!themeID) return console.error('Missing themeID')

    try {
        const res = await Axios.put(settings.SERVER_URL + '/settings/theme', {
            userID,
            newThemeData,
            themeID,
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

export const deleteTheme = async (userID, themeID) => {
    if (!userID) return console.error('Missing userID')
    if (!themeID) return console.error('Missing themeID')

    try {
        const res = await Axios.delete(
            settings.SERVER_URL + '/settings/theme',
            {
                data: {
                    userID,
                    themeID,
                },
            }
        )

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
