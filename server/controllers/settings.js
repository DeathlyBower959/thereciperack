import User from '../models/userModel.js'

export const getSettings = async (req, res) => {
    const userData = req.query

    if (!userData.userID)
        return res.status(400).json({
            message: 'Missing userID',
            missing: ['userID'],
            data: userData,
        })

    try {
        const user = await User.findOne({ id: userData.userID })

        if (user == null || user == undefined)
            return res.status(404).json({
                message: 'User not found',
                data: userData,
            })

        res.status(200).json(user.settings)
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: err.message })
    }
}

//* Themes *\\
export const createTheme = async (req, res) => {
    const userData = req.body


    if (!userData.userID || !userData.newTheme || !userData.newTheme.themeID) {
        let missing = []
        if (!userData.userID) missing.push('userID')
        if (!userData.newTheme) missing.push('newTheme')
        if (!userData.newTheme.themeID) missing.push('newTheme.themeID')
        return res.status(400).json({
            message: 'Missing userID/newTheme/newTheme.themeID',
            missing,
            data: userData,
        })
    }

    if (userData.newTheme.themeID.startsWith('default_themes.'))
        return res.status(400).json({
            message: 'Cannot create a default theme | Theme creation failed',
            data: userData,
        })

    try {
        const user = await User.findOne({ id: userData.userID })

        if (user == null || user == undefined)
            return res
                .status(404)
                .json({ message: 'User not found', data: userData })

        if (
            user.settings.themes.some(
                (x) => x.themeID == userData.newTheme.themeID
            )
        )
            return res.status(403).json({
                message: 'Theme with that id already exists',
            })

        user.settings.themes.push(userData.newTheme)
        user.settings.selectedTheme = userData.newTheme.themeID
        const newUser = await user.save()
        


        res.status(201).json(newUser)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const editTheme = async (req, res) => {
    const userData = req.body
    if (!userData.userID || !userData.themeID || !userData.newThemeData) {
        let missing = []
        if (!userData.userID) missing.push('userID')
        if (!userData.themeID) missing.push('themeID')
        if (!userData.newThemeData) missing.push('newThemeData')
        return res.status(400).json({
            message: 'Missing userID/themeID/newThemeData',
            missing,
            data: userData,
        })
    }
    if (userData.themeID.startsWith('default_themes.'))
        return res.status(400).json({
            message: 'Cannot edit a default theme',
            data: userData,
        })

    try {
        let user = await User.findOne({ id: userData.userID })

        if (user == null || user == undefined)
            return res.status(404).json({ message: 'User not found!' })

        const index = user.settings.themes.findIndex(
            (x) => x.themeID == userData.themeID
        )

        user.settings.themes[index] = {
            themeID: userData.themeID,
            ...user.settings.themes[index],
            ...userData.newThemeData,
        }

        const newUser = await user.save()

        res.status(200).json(newUser)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const deleteTheme = async (req, res) => {
    const userData = req.body

    if (!userData.userID || !userData.themeID) {
        let missing = []
        if (!userData.userID) missing.push('userID')
        if (!userData.newTheme) missing.push('themeID')
        return res.status(400).json({
            message: 'Missing userID/themeID',
            missing,
            data: userData,
        })
    }

    if (userData.themeID.startsWith('default_themes.'))
        return res.status(400).json({
            message: 'Cannot delete a default theme',
            data: userData,
        })

    try {
        let user = await User.findOne({ id: userData.userID })

        if (user == null || user == undefined)
            return res.status(404).json({
                message: 'User not found!',
                data: userData,
            })

        const index = user.settings.themes.findIndex(
            (x) => x.id == userData.themeID
        )
        user.settings.themes.splice(index, 1)

        const newUser = await user.save()

        res.status(200).json(newUser)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const changeTheme = async (req, res) => {
    const userData = req.body
    if (!userData.userID || userData.themeID) {
        let missing = []
        if (!userData.userID) missing.push('userID')
        if (!userData.newTheme) missing.push('themeID')
        return res.status(400).json({
            message: 'Missing userID/themeID',
            missing,
            data: userData,
        })
    }

    try {
        const user = User.findOne({ id: userData.userID })

        if (user == null || user == undefined)
            return res.status(404).json({
                message: 'User was not found!',
                data: userData,
            })

        if (!user.settings.themes.find((x) => x.id == themeID))
            return res.status(404).json({
                message: 'Theme was not found',
                data: userData,
            })

        user.settings.selectedTheme = userData.themeID

        const newUser = await user.save()

        res.status(200).json(newUser)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}
