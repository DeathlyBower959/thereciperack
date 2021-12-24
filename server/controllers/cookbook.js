import User from '../models/userModel.js'

export const getCookbooks = async (req, res) => {
    const userData = req.query

    if (!userData.userID)
        return res.status(400).json({ message: 'Missing userID' })

    try {
        const user = await User.findOne({ id: userData.userID })

        if (user == null || user == undefined)
            return res.status(404).json({
                message: 'User not found',
                data: userData,
            })

        res.status(200).json(user.cookbooks)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const createCookbook = async (req, res) => {
    const userData = req.body
    if (!userData.userID || !userData.cookbook) {
        let missing = []
        if (!userData.userID) missing.push('userID')
        if (!userData.cookbook) missing.push('cookbook')

        return res.status(400).json({
            message: 'Missing userID/cookbook',
            missing,
            data: userData,
        })
    }

    try {
        const newUser = await User.findOneAndUpdate(
            { id: userData.userID },
            {
                $push: {
                    cookbooks: userData.cookbook,
                },
            },
            { returnOriginal: false }
        )

        if (newUser == null || newUser == undefined)
            return res
                .status(404)
                .json({ message: 'User not found!', data: userData })

        res.status(201).json(newUser)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const editCookbook = async (req, res) => {
    const userData = req.body
    if (
        !userData.userID ||
        !userData.cookbookID ||
        !userData.newCookbookData
    ) {
        let missing = []
        if (!userData.userID) missing.push('userID')
        if (!userData.cookbookID) missing.push('cookbookID')
        if (!userData.newCookbookData) missing.push('newCookbookData')

        return res.status(400).json({
            message: 'Missing userID/cookbookID/newCookbookData',
            missing,
            data: userData,
        })
    }

    try {
        let user = await User.findOne({ id: userData.userID })

        if (user == null || user == undefined)
            return res.status(404).json({ message: 'User not found!' })

        const index = user.cookbooks.findIndex(
            (x) => x.id == userData.cookbookID
        )

        if (index == -1 || index == null || index == undefined)
            return res
                .status(404)
                .json({ message: 'Cookbook was not found', data: userData })

        user.cookbooks[index] = {
            ...user.cookbooks[index],
            ...userData.newCookbookData,
        }

        const newUser = await user.save()

        if (newUser == null || newUser == undefined)
            return res.status(404).json({ message: 'User not found!' })

        res.status(200).json(newUser)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const deleteCookbook = async (req, res) => {
    const userData = req.body
    
    if (!userData.userID || !userData.cookbookID) {
        let missing = []
        if (!userData.userID) missing.push('userID')
        if (!userData.cookbookID) missing.push('cookbookID')

        return res.status(400).json({
            message: 'Missing userID/cookbookID',
            missing,
            data: userData,
        })
    }

    try {
        const newUser = await User.findOneAndUpdate(
            { id: userData.userID },
            {
                $pull: {
                    cookbooks: { id: userData.cookbookID },
                },
            },
            { returnOriginal: false }
        )

        if (newUser == null || newUser == undefined)
            return res.status(404).json({
                message: 'User was not found! | Cookbook deletion failed',
            })

        res.status(200).json(newUser)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}
