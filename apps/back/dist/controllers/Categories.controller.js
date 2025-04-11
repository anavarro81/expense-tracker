"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCategories = exports.deleteAllCategories = exports.updateCategory = exports.deleteCategory = exports.getAllCategories = exports.newCategory = void 0;
const Categories_model_1 = __importDefault(require("../models/Categories.model"));
// Create a new category
const newCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        const newCategory = new Categories_model_1.default(req.body);
        yield newCategory.save();
        res.status(201).json({ message: 'Category created successfully', newCategory });
    }
    catch (error) {
        console.log('Error creating category', error);
        res.status(500).json({ message: 'Error creating category', error });
    }
});
exports.newCategory = newCategory;
// Get all categories
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.log('Error getting categories', error);
        res.status(500).json({ message: 'Error getting categories', error });
    }
});
exports.getAllCategories = getAllCategories;
// Delete a category
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.deleteCategory = deleteCategory;
// Update a category
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        // Devuelve el documento con los datos actualizado. new: true
        const updatedCategory = Categories_model_1.default.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!updatedCategory) {
            res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category updated successfully', updatedCategory });
    }
    catch (error) {
        console.log('Error actualizando la categoria', error);
        res.status(500).json({ message: 'Error updating category', error });
    }
});
exports.updateCategory = updateCategory;
// delelte all categories
const deleteAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Categories_model_1.default.deleteMany({});
        res.status(200).json({ message: 'All categories deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting categories', error });
    }
});
exports.deleteAllCategories = deleteAllCategories;
const loadCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Loading categories', req.body);
    try {
        const insertedCategories = yield Categories_model_1.default.insertMany(req.body);
        if (!insertedCategories) {
            res.status(404).json({ message: 'Categories not found' });
        }
        res.status(201).json({ message: 'Categories loaded successfully', insertedCategories });
    }
    catch (error) {
        console.log('Error cargando las categorias', error);
        res.status(500).json({ message: 'Error loading categories', error });
    }
});
exports.loadCategories = loadCategories;
