import User from '../models/userModel.js'

export const getShopItems = async (req, res) => {
    const userData = req.query

    if (!userData.userID) {
        return res.status(400).json({
            message: 'Missing userID',
            missing: ['userID'],
            data: userData,
        })
    }

    try {
        const user = await User.findOne({ id: userData.userID })

        if (user == null || user == undefined)
            return res.status(404).json({
                message: 'User not found',
                data: userData,
            })

        res.status(200).json(user.shoppingList)
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: err.message })
    }
}

export const createShopItem = async (req, res) => {
    const userData = req.body
    if (!userData.userID || !userData.shopItem) {
        let missing = []
        if (!userData.userID) missing.push('userID')
        if (!userData.shopItem) missing.push('shopItem')
        return res.status(400).json({
            message: 'Missing userID/shopItem',
            missing,
            data: userData,
        })
    }

    try {
        const newUser = await User.findOneAndUpdate(
            { id: userData.userID },
            {
                $push: {
                    shoppingList: userData.shopItem,
                },
            },
            { returnOriginal: false }
        )

        if (newuser == null || user == undefined)
            return res.status(404).json({
                message: 'User not found!',
                data: userData,
            })

        res.status(201).json(newUser)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const editShopping = async (req, res) => {
    const userData = req.body
    if (!userData.userID || !userData.shopItemID || !userData.newShopData) {
        let missing = []
        if (!userData.userID) missing.push('userID')
        if (!userData.shopItemID) missing.push('shopItemID')
        if (!userData.newShopData) missing.push('newShopData')
        return res.status(400).json({
            message: 'Missing userID/shopItemID/newShopData',
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

        const index = user.shoppingList.findIndex(
            (x) => x.id == userData.shopItemID
        )
        user.shoppingList[index] = {
            ...user.shoppingList[index],
            ...newRecipeData,
        }

        const newUser = await user.save()

        res.status(200).json(newUser)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const deleteShopItem = async (req, res) => {
    const userData = req.body
    if (!userData.userID || !userData.shopID) {
        let missing = []
        if (!userData.email) missing.push('email')
        if (!userData.shopID) missing.push('shopID')
        return res.status(400).json({
            message: 'Missing userID/shopID',
            missing,
            data: userData,
        })
    }

    try {
        const newUser = await User.findOneAndUpdate(
            { id: userData.userID },
            {
                $pull: {
                    shoppingList: { id: userData.shopID },
                },
            },
            { returnOriginal: false }
        )

        if (newuser == null || user == undefined)
            return res.status(404).json({
                message: 'User not found!',
                data: userData,
            })

        res.status(200).json(newUser)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}
