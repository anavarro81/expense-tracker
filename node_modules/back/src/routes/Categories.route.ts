import express from "express";
import {
    newCategory,
    getAllCategories,
    deleteCategoryById
} from '../controllers/Categories.controller';

const categoriesRoute = express.Router();

categoriesRoute.post('/', newCategory);
categoriesRoute.get('/', getAllCategories);
categoriesRoute.delete('/:id', deleteCategoryById);

export default categoriesRoute;
