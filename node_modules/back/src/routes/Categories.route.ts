import express  from "express";
import {newCategory, getAllCategories, deleteCategory, updateCategory, deleteAllCategories, loadCategories} from "../controllers/Categories.controller";

const categoriesRoute = express.Router();

console.log('Categories route loaded...');


categoriesRoute.post('/', newCategory)
categoriesRoute.post('/load-categories', loadCategories)


export default categoriesRoute;