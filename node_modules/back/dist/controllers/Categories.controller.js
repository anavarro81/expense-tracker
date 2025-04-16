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
exports.deleteCategoryById = exports.getAllCategories = exports.newCategory = void 0;
const Categories_model_1 = __importDefault(require("../models/Categories.model"));
// Crear uno nuevo
const newCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCategory = new Categories_model_1.default(req.body);
        yield newCategory.save();
        res.status(201).json({ message: 'Category created successfully', newCategory });
    }
    catch (error) {
        console.log('Error creating Category', error);
        res.status(500).json({ message: 'Error creating Category', error });
    }
});
exports.newCategory = newCategory;
// Obtener todos
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Categories_model_1.default.find({});
        if (!categories) {
            res.status(404).json({ message: 'Categories not found' });
        }
        res.status(200).json({ message: 'Categories: ', categories });
    }
    catch (error) {
        console.log('Error getting Categories', error);
        res.status(500).json({ message: 'Error getting Categories', error });
    }
});
exports.getAllCategories = getAllCategories;
// Borrar por ID
const deleteCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedCategory = yield Categories_model_1.default.findByIdAndDelete(id);
        if (!deletedCategory) {
            res.status(404).json({ message: "This ID does not exist" });
        }
        res.status(200).json(deletedCategory);
    }
    catch (error) {
        console.log('Error deleting Category', error);
        res.status(500).json(error);
    }
});
exports.deleteCategoryById = deleteCategoryById;
