import { Request, Response } from 'express';
import CategoryModel from '../models/Categories.model';
import { get } from 'http';

// Create a new category
const newCategory = async (req: Request, res: Response): Promise<void>  => {

    try {
        const { name, description } = req.body;
        const newCategory = new CategoryModel(req.body);
        await newCategory.save();
        res.status(201).json({ message: 'Category created successfully', newCategory });
    }
    catch (error) {
        console.log('Error creating category', error);
        res.status(500).json({ message: 'Error creating category', error });
    }
}

// Get all categories
const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        
    } catch (error) {
        console.log('Error getting categories', error);
        res.status(500).json({ message: 'Error getting categories', error });
        
    }
}

// Delete a category
const deleteCategory = async (req: Request, res: Response): Promise<void> => {

}

// Update a category
const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const { id } = req.params;
        const { name, description } = req.body;
        
        // Devuelve el documento con los datos actualizado. new: true
        const updatedCategory = CategoryModel.findByIdAndUpdate(id, { name, description }, { new: true })

        if (!updatedCategory) {
            res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category updated successfully', updatedCategory });

    } catch (error) {

        console.log('Error actualizando la categoria', error);
        res.status(500).json({ message: 'Error updating category', error });    
    }
}

// delelte all categories
const deleteAllCategories = async (req: Request, res: Response): Promise<void> => {    
        try {
            await CategoryModel.deleteMany({});
            res.status(200).json({ message: 'All categories deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting categories', error });
        }
}

const loadCategories = async (req: Request, res: Response): Promise<void> => {

    console.log('Loading categories', req.body);
    
    try {
        
        const insertedCategories = await CategoryModel.insertMany(req.body)

        if(!insertedCategories) {
            res.status(404).json({ message: 'Categories not found' });
        }

        res.status(201).json({ message: 'Categories loaded successfully', insertedCategories });
        
    } catch (error) {

        console.log('Error cargando las categorias', error);
        res.status(500).json({ message: 'Error loading categories', error });
        
    }
}


export {newCategory, getAllCategories, deleteCategory, updateCategory, deleteAllCategories, loadCategories};

