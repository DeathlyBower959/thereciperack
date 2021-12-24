import express from 'express'
import { getSettings, createTheme, editTheme, deleteTheme, changeTheme } from '../controllers/settings.js'

const router = express.Router()

router.get('/', getSettings)
router.post('/theme', createTheme)
router.put('/theme', editTheme)
router.delete('/theme', deleteTheme)
router.put('/changetheme', changeTheme)

export default router