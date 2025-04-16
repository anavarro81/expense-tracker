"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Categories_controller_1 = require("../controllers/Categories.controller");
const categoriesRoute = express_1.default.Router();
categoriesRoute.post('/', Categories_controller_1.newCategory);
categoriesRoute.get('/', Categories_controller_1.getAllCategories);
categoriesRoute.delete('/:id', Categories_controller_1.deleteCategoryById);
exports.default = categoriesRoute;
