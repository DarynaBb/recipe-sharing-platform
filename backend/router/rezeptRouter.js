import {Router} from 'express'
import { getAllRecipes, createRecipe, updateRecipe, deleteRecipe, createUser } from '../controller/rezeptControllers.js'
const rezeptRouter = Router()

rezeptRouter.get("/", getAllRecipes );
rezeptRouter.post("/", createRecipe);
rezeptRouter.put("/:userId/:recipeId", updateRecipe);
rezeptRouter.delete ('/:userId/:recipeId', deleteRecipe);

export default rezeptRouter;
