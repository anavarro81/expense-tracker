"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ['default', 'custom'], required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, default: null, ref: 'User' }
}, {
    timestamps: true,
});
const CategoryModel = (0, mongoose_1.model)("Category", CategorySchema);
exports.default = CategoryModel;
