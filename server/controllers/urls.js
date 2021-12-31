import Url from '../models/urlModel.js'
import validUrl from 'valid-url'
import shortid from 'shortid'
import settings from '../settings.js'

export const shortenURL = async (req, res) => {
    const urlData = req.body
    const baseUrl = settings.SERVER_URL

    if (!urlData?.longUrl) {
        let missing = []
        if (!urlData.longUrl) missing.push('longUrl')

        return res.status(400).json({
            message: 'Missing longUrl',
            missing,
            data: urlData,
        })
    }

    // Validate URLS
    if (!validUrl.isUri(urlData.longUrl))
        return res.status(400).json('Invalid longUrl')

    // Create url code
    const urlCode = shortid.generate()

    try {
        let url = await Url.findOne({ longUrl: urlData.longUrl })

        if (url) {
            return res.status(200).json(url)
        } else {
            const shortUrl = baseUrl + '/' + urlCode

            const date = Date.now()
            console.log(new Date(date))

            url = new Url({
                longUrl: urlData.longUrl,
                shortUrl,
                urlCode,
                date,
            })

            await url.save()

            return res.status(201).json(url)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

export const redirectURL = async (req, res) => {
    const urlData = req.query

    if (!urlData?.code) {
        let missing = []
        if (!urlData.code) missing.push('code')

        return res.status(400).json({
            message: 'Missing code',
            missing,
            data: urlData,
        })
    }

    try {
        const url = await Url.findOne({ urlCode: urlData.code })

        if (url) {
            return res.status(200).json({longUrl: url.longUrl})
        } else {
            return res.status(404).json('No url found')
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}
