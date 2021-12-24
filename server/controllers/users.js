import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { send, sendEmail } from './email.js'

export const getUser = async (req, res) => {
    const userData = req.query

    if ((!userData.email || !userData.password) && !userData.userID) {
        let missing = []
        if (!userData.email) missing.push('email')
        if (!userData.password) missing.push('password')
        if (!userData.userID) missing.push('userID')

        return res.status(400).json({
            message: 'Missing email/password || userID',
            missing,
            data: userData,
        })
    }

    try {
        let user

        if (userData.userID) user = await User.findOne({ id: userData.userID })
        else {
            user = await User.findOne({
                email: userData.email,
                password: userData.password,
            })
        }

        if (user == null || user == undefined)
            return res
                .status(404)
                .json({ message: 'User not found', data: userData })

        res.status(200).json(user)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const createUser = async (req, res) => {
    const userData = req.body

    if (!userData.name || !userData.email || !userData.password) {
        let missing = []
        if (!userData.name) missing.push('name')
        if (!userData.email) missing.push('email')
        if (!userData.password) missing.push('password')

        return res.status(400).json({
            message: 'Missing name/email/password',
            missing,
            data: userData,
        })
    }

    const foundUser = await User.findOne({ email: userData.email })

    if (foundUser != null || foundUser != undefined)
        return res.status(403).json({
            message: 'User already exists',
            data: userData,
        })

    const newUser = new User({
        ...userData,
        email: userData.email?.toLowerCase(),
    })

    const token = jwt.sign(
        { id: newUser.id, email: userData.email.toLowerCase() },
        process.env.JWT_TOKEN,
        {
            expiresIn: '10m',
        }
    )

    newUser.token = token

    send(
        userData.email,
        'Verification Email',
        `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <title>Static Template</title>
            <link
              href="https://fonts.googleapis.com/css?family=Muli&amp;display=swap"
              rel="stylesheet"
            />
          </head>
          <body>
            <div
              style="
                margin: auto;
                width: 400px;
                background-color: #f6f6f6;
                padding: 10px;
                font-family: 'Muli', sans-serif;
              "
            >
              <div
                style="
                  margin: 15px;
                  padding: 10px;
                  background-color: #fff;
                  text-align: center;
                "
              >
                <h2>Thanks for signing up,<br />${userData.name}!</h2>
        
                <p style="padding-left: 25px; padding-right: 25px;">
                  Please verify your email address to unlock more features!
                </p>
        
                <a href="http://localhost:5000/users/authenticate/?token=${token}" target="_blank">
                  <button
                    style="
                      width: 45%;
                      padding: 10px 20px 10px 20px;
                      background-color: #a74ef6;
        
                      border-radius: 20px;
                      outline: 0;
                      border: 0;
                      cursor: pointer;
                      margin-bottom: 10px;
                    "
                  >
                    Verify Email Now
                  </button>
                </a>
              </div>
            </div>
          </body>
        </html>
                `
    )

    try {
        await newUser.save()

        res.status(201).json(newUser)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

export const authenticateUser = async (req, res) => {
    const userData = req.query

    if (!userData.token) {
        let missing = []
        if (!userData.token) missing.push('token')

        return res.status(400).json({
            message: 'Missing token',
            missing,
            data: userData,
        })
    }

    try {
        const decoded = jwt.verify(userData.token, process.env.JWT_TOKEN)

        const foundUser = await User.findOne({ id: decoded.id })

        if (!foundUser) {
            console.log('Failed to auth user')
            return res.status(404).json({
                message: 'User not found',
                data: userData,
            })
        }

        foundUser.token = null
        foundUser.save()
        res.send(`
        <!doctype html>
        <html>
            <head>
                <title>Authenticated!</title>
            </head>
            <body>
                Authenticated! You can close this tab now...
                <script>
                window.open('http://thereciperack.ml')
                close()
                </script>
            </body>
        </html>
        `)
    } catch (err) {
        return res.status(401).send('Invalid Token')
    }
}

export const updateUser = async (req, res) => {
    const userData = req.body

    if (!userData.userID || !userData.newUser) {
        let missing = []
        if (!userData.userID) missing.push('userID')
        if (!userData.newUser) missing.push('newUser')
        return res.status(400).json({
            message: 'Missing userID/newUser',
            missing,
            data: userData,
        })
    }

    try {
        if (
            userData.newUser.password == undefined ||
            userData.newUser.password == null
        )
            delete userData.newUser.password

        const newUser = await User.findOneAndUpdate(
            { id: userData.userID },
            userData.newUser,
            { returnOriginal: false }
        )

        if (newUser == null || newUser == undefined)
            return res
                .status(404)
                .json({ message: 'User not found', data: userData })

        res.status(201).json(newUser)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

export const deleteUser = async (req, res) => {
    const userData = req.body

    if (!userData.userID)
        return res.status(400).json({
            message: 'Missing userID',
            missing: ['userID'],
            data: userData,
        })

    if ((await User.findOne({ id: userData.userID })) == null)
        return res.status(409).json({
            message: 'User not found',
            data: userData,
        })

    try {
        await User.deleteOne({ id: userData.userID })

        res.status(200).json()
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
