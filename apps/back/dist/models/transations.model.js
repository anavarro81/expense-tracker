"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transationsSchema = new mongoose_1.Schema({
    type: { type: String,
        required: true,
        enum: ['ingreso', 'gasto']
    },
    percentaje: { type: Number, required: false },
    // La categoria debe ser de la coleccion de categorias
    category: { type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: { type: String, required: false },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    Currency: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true
});
const Transations = (0, mongoose_1.model)('Transations', transationsSchema);
exports.default = Transations;
