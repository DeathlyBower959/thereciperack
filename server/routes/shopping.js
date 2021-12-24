import express from 'express'
import { getShopItems, createShopItem, editShopping, deleteShopItem } from '../controllers/shopping.js'

const router = express.Router()

router.get('/', getShopItems)
router.post('/', createShopItem)
router.put('/', editShopping)
router.delete('/', deleteShopItem)

export default router