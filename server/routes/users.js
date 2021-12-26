import express from 'express'
import {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    authenticateUser,
    regenJWTToken
} from '../controllers/users.js'

const router = express.Router()

router.get('/', getUser)
router.post('/', createUser)
router.put('/', updateUser)
router.delete('/', deleteUser)

router.get('/authenticate', authenticateUser)
router.get('/regenToken', regenJWTToken)

export default router
