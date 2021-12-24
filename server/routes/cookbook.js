import express from 'express'
import { getCookbooks, createCookbook, editCookbook, deleteCookbook } from '../controllers/cookbook.js'

const router = express.Router()

router.get('/', getCookbooks)
router.post('/', createCookbook)
router.put('/', editCookbook)
router.delete('/', deleteCookbook)

export default router