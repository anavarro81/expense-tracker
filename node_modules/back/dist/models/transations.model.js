"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TransactionSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true, enum: ["Ingreso", "Gasto"] },
    percentage: { type: Number },
    category: { type: String, required: true },
    notes: { type: String },
    amount: { type: Number, required: true },
    date: { type: Date },
    currency: { type: String, required: true },
}, {
    timestamps: true,
});
const TransactionModel = (0, mongoose_1.model)("Transaction", TransactionSchema);
exports.default = TransactionModel;
