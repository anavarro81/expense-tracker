import { Request, Response } from 'express';
import CategoryModel from '../models/Categories.model';

// Crear uno nuevo
export const newCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const newCategory = new CategoryModel(req.body);
        await newCategory.save();
        res.status(201).json({ message: 'Category created successfully', newCategory });
    } catch (error) {
        console.log('Error creating Category', error);
        res.status(500).json({ message: 'Error creating Category', error });
    }
}

// Obtener todos
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await CategoryModel.find({});
        if (!categories) {
            res.status(404).json({ message: 'Categories not found' });
        }
        res.status(200).json({ message: 'Categories: ', categories });
    } catch (error) {
        console.log('Error getting Categories', error);
        res.status(500).json({ message: 'Error getting Categories', error });
    }
}

// Borrar por ID
export const deleteCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedCategory = await CategoryModel.findByIdAndDelete(id);
        if (!deletedCategory) {
            res.status(404).json({ message: "This ID does not exist" });
        }
        res.status(200).json(deletedCategory);
    } catch (error) {
        console.log('Error deleting Category', error);
        res.status(500).json(error);
    }
}
