"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Se importan los tipos
const mongoose_1 = require("mongoose");
const TotalsSchema = new mongoose_1.Schema({
    totalIncome: {
        type: String,
        required: true,
    },
    totalExpense: {
        type: String,
        required: true,
    },
}, {
    timestamps: true // Añade los campos createdAt y updatedAt
});
// Se utiliza un Generics para indicar que el interface IUser es el que se va a utilizar
const Totals = (0, mongoose_1.model)('Totals', TotalsSchema);
exports.default = Totals;
