"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialSummary = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FinancialSummarySchema = new mongoose_1.default.Schema({
    total_incomes: {
        type: Number,
        required: true,
        default: 0,
    },
    total_expenses: {
        type: Number,
        required: true,
        default: 0,
    },
});
exports.FinancialSummary = mongoose_1.default.model("FinancialSummary", FinancialSummarySchema);
