import express from 'express'
import {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    authenticateUser,
} from '../controllers/users.js'

const router = express.Router()

router.get('/', getUser)
router.post('/', createUser)
router.put('/', updateUser)
router.delete('/', deleteUser)

router.get('/authenticate', authenticateUser)

export default router
