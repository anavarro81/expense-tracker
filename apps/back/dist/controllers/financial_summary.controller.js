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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFinancialSummaries = exports.createFinancialSummary = void 0;
const financial_summary_model_1 = require("../models/financial_summary.model");
// Crear uno nuevo
const createFinancialSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSummary = new financial_summary_model_1.FinancialSummary(req.body);
        const savedSummary = yield newSummary.save();
        res.status(201).json(savedSummary);
    }
    catch (error) {
        res.status(400).json({ message: "Error al crear FinancialSummary", error });
    }
});
exports.createFinancialSummary = createFinancialSummary;
// Obtener todos
const getAllFinancialSummaries = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summaries = yield financial_summary_model_1.FinancialSummary.find();
        res.status(200).json(summaries);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener FinancialSummaries", error });
    }
});
exports.getAllFinancialSummaries = getAllFinancialSummaries;
