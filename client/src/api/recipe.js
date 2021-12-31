import Axios from 'axios'
import settings from '../settings.js'

export const getRecipes = async (userID, cookbookID) => {
    if (!userID) return console.error('Missing userID')
    if (!cookbookID) return console.error('Missing cookbookID')

    try {
        const res = await Axios.get(settings.SERVER_URL + '/recipe', {
            params: {
            userID,
            cookbookID,
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

export const createRecipe = async (userID, cookbookID, recipe) => {
    if (!userID) return console.error('Missing userID')
    if (!cookbookID) return console.error('Missing cookbookID')
    if (!recipe) return console.error('Missing recipe')

    try {
        const res = await Axios.post(settings.SERVER_URL + '/recipe', {
            userID,
            cookbookID,
            recipe,
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

export const editRecipe = async (
    userID,
    cookbookID,
    recipeID,
    newRecipeData
) => {
    if (!userID) return console.error('Missing userID')
    if (!cookbookID) return console.error('Missing cookbookID')
    if (!recipeID) return console.error('Missing recipeID')
    if (!newRecipeData) return console.error('Missing newRecipeData')

    try {
        const res = await Axios.put(settings.SERVER_URL + '/recipe', {
            userID,
            cookbookID,
            recipeID,
            newRecipeData,
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

export const deleteRecipe = async (userID, cookbookID, recipeID) => {
    if (!userID) return console.error('Missing userID')
    if (!cookbookID) return console.error('Missing cookbookID')
    if (!recipeID) return console.error('Missing recipeID')
    try {
        const res = await Axios.delete(settings.SERVER_URL + '/recipe', {
            data: {
                userID,
                cookbookID,
                recipeID,
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
