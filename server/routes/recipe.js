import express from 'express'
import { getRecipes, createRecipe,editRecipe,  deleteRecipe} from '../controllers/recipe.js'

const router = express.Router()

router.get('/', getRecipes)
router.post('/', createRecipe)
router.put('/', editRecipe)
router.delete('/', deleteRecipe)

export default router