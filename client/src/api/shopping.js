import Axios from 'axios'
import settings from '../settings.js'

export const getShopItems = async (userID) => {
    if (!userID) return console.error('Missing userID')

    try {
        const res = await Axios.get(settings.SERVER_URL + '/shopping', {
            params: {
            userID,
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

export const createShopItem = async (userID, shopItem) => {
    if (!userID) return console.error('Missing userID')
    if (!shopItem) return console.error('Missing shopItem')

    try {
        const res = await Axios.post(settings.SERVER_URL + '/shopping', {
            userID,
            shopItem,
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

export const editShopping = async (userID, shopItemID, newShopData) => {
    if (!userID) return console.error('Missing userID')
    if (!shopItemID) return console.error('Missing shopItemID')
    if (!newShopData) return console.error('Missing newShopData')

    try {
        const res = await Axios.put(settings.SERVER_URL + '/shopping', {
            userID,
            shopItemID,
            newShopData,
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

export const deleteShopItem = async (userID, shopItemID) => {
    if (!userID) return console.error('Missing userID')
    if (!shopItemID) return console.error('Missing shopItemID')

    try {
        const res = await Axios.delete(settings.SERVER_URL + '/shopping', {
            userID,
            shopItemID,
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
