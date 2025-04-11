import express  from "express";
import {newCategory, getAllCategories, deleteCategory, updateCategory, deleteAllCategories, loadCategories, getCategoryById, deleteCategoryById} from "../controllers/Categories.controller";

const categoriesRoute = express.Router();




categoriesRoute.post('/', newCategory)
categoriesRoute.post('/load-categories', loadCategories)
categoriesRoute.get('/', getAllCategories)
categoriesRoute.get('/:id', getCategoryById)
categoriesRoute.delete('/:id', deleteCategoryById)



export default categoriesRoute; 