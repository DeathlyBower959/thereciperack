import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export const send = async (to, subject, html) => {
    // return console.error('Not implemented just yet')
    var transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD,
        },
    })

    console.log('SMTP Configured')

    // Message object
    var message = {
        // sender info
        from: 'The Recipe Rack <thereciperack@example.com>',

        // Comma separated list of recipients
        to,

        // Subject of the message
        subject,

        // HTML body
        html,
    }

    if (await transport.verify() != true) return console.error('Error Sending Email')

    console.log('Sending Mail')
    transport
        .sendMail(message)
        .then((info) => {
            console.log({ info })
        })
        .catch(console.error)
}

export const sendEmail = async (req, res) => {
    // return res.status(404).json({message: 'Currently Broken'})

    const { to, subject, html } = req.query

    if (!to || !subject || !html) {
        let missing = []
        if (!to) missing.push('to')
        if (!subject) missing.push('subject')
        if (!html) missing.push('html')

        return res.status(400).json({
            message: 'Missing to/subject/html',
            missing,
            data: req.query,
        })
    }

    try {
        send(to, subject, html)
        return res.status(200)
    } catch (error) {
        console.log(error)
        res.status(409).json({ message: error.message })
    }
}
