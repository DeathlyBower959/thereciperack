import User from '../models/userModel.js'

export const getRecipes = async (req, res) => {
    const userData = req.query

    if (!userData.userID || !userData.cookbookID) {
        let missing = []
        if (!userData.userID) missing.push('userID')
        if (!userData.cookbookID) missing.push('cookbookID')
        return res
            .status(400)
            .json({ message: 'Missing userID/cookbookID', data: userData })
    }

    try {
        const user = await User.findOne({ id: userData.userID })

        if (user == null || user == undefined)
            return res.status(404).json({
                message: 'User not found',
                data: userData,
            })

        const index = user.cookbooks.findIndex(
            (x) => x.id == userData.cookbookID
        )

        if (index == -1 || index == null || index == undefined)
            return res
                .status(404)
                .json({ message: 'Cookbook not found', data: userData })

        res.status(200).json(user.cookbooks[index].recipes)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const createRecipe = async (req, res) => {
    const userData = req.body
    if (!userData.userID || !userData.cookbookID || !userData.recipe) {
        let missing = []
        if (!userData.userID) missing.push('userID')
        if (!userData.cookbookID) missing.push('cookbookID')
        if (!userData.recipe) missing.push('recipe')
        return res.status(400).json({
            message: 'Missing userID/cookbookID/recipe',
            missing,
            data: userData,
        })
    }

    try {
        let user = await User.findOne({ id: userData.userID })

        if (user == null || user == undefined)
            return res
                .status(404)
                .json({ message: 'User not found!', data: userData })

        const index = user.cookbooks.findIndex(
            (x) => x.id == userData.cookbookID
        )

        if (index == -1 || index == null || index == undefined)
            return res
                .status(404)
                .json({ message: 'Cookbook not found', data: userData })

        user.cookbooks[index].recipes.push(userData.recipe)
        const newUser = await user.save()

        res.status(201).json(newUser)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const editRecipe = async (req, res) => {
    const userData = req.body
    if (
        !userData.userID ||
        !userData.cookbookID ||
        !userData.recipeID ||
        !userData.newRecipeData
    ) {
        let missing = []
        if (!userData.userID) missing.push('userID')
        if (!userData.cookbookID) missing.push('cookbookID')
        if (!userData.recipeID) missing.push('recipeID')
        if (!userData.newRecipeData) missing.push('newRecipeData')

        return res.status(400).json({
            message: 'Missing userID/cookbookID/recipeID/newRecipeData',
            missing,
            data: userData,
        })
    }

    try {
        let user = await User.findOne({ id: userData.userID })

        if (user == null || user == undefined)
            return res
                .status(404)
                .json({ message: 'User not found', data: userData })

        const cIndex = user.cookbooks.findIndex(
            (x) => x.id == userData.cookbookID
        )

        if (cIndex == -1 || cIndex == null || cIndex == undefined)
            return res
                .status(404)
                .json({ message: 'Cookbook not found', data: userData })

        const rIndex = user.cookbooks[cIndex].recipes.findIndex(
            (x) => x.id == userData.recipeID
        )

        if (rIndex == -1 || rIndex == null || rIndex == undefined)
            return res
                .status(404)
                .json({ message: 'Recipe not found', data: userData })

        user.cookbooks[cIndex].recipes[rIndex] = {
            ...user.cookbooks[cIndex].recipes[rIndex],
            ...newRecipeData,
        }

        const newUser = await user.save()

        res.status(200).json(newUser)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const deleteRecipe = async (req, res) => {
    const userData = req.body
    if (!userData.userID || !userData.cookbookID || !userData.recipeID) {
        let missing = []
        if (!userData.userID) missing.push('userID')
        if (!userData.cookbookID) missing.push('cookbookID')
        if (!userData.recipeID) missing.push('recipeID')
        return res.status(400).json({
            message: 'Missing userID/cookbookID/recipeID',
            missing,
            data: userData,
        })
    }

    try {
        let user = await User.findOne({ id: userData.userID })

        if (user == null || user == undefined)
            return res
                .status(404)
                .json({ message: 'User not found', data: userData })

        const cIndex = user.cookbooks.findIndex(
            (x) => x.id == userData.cookbookID
        )

        if (cIndex == -1 || cIndex == null || cIndex == undefined)
            return res
                .status(404)
                .json({ message: 'Cookbook not found', data: userData })

        user.cookbooks[cIndex].recipes.splice(
            user.cookbooks[cIndex].recipes.findIndex(
                (x) => x.id == userData.recipeID
            ),
            1
        )
        const newUser = await user.save()

        res.status(200).json(newUser)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}
