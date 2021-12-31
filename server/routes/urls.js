import express from 'express'
import {
    shortenURL,
    redirectURL
} from '../controllers/urls.js'

const router = express.Router()

router.get('/', redirectURL)
router.post('/create', shortenURL)

export default router
