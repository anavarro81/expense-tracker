"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transationsSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    percentaje: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: false },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    Currency: { type: String, required: true },
    user: { type: String, required: true }
}, {
    timestamps: true
});
const Transations = (0, mongoose_1.model)('Transations', transationsSchema);
