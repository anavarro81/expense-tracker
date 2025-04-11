"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Existen categorias por defecto y categorias personalizadas
// Las categorias personalizadas tendrán un userId asociado
const CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    type: { type: String, required: true, enum: ['default', 'custom'] },
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: false, default: null },
}, {
    timestamps: true,
});
const CategoryModel = (0, mongoose_1.model)("Category", CategorySchema);
exports.default = CategoryModel;
