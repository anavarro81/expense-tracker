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
exports.loadTransations = exports.deleteTransactionById = exports.getTransaction = exports.getTransactionsByMonth = exports.getAllTransactions = exports.newTransaction = void 0;
const transations_model_1 = __importDefault(require("../models/transations.model"));
const financial_summary_model_1 = require("../models/financial_summary.model");
const utils_1 = require("../utils/utils");
const newTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newTransaction = new transations_model_1.default(req.body);
        yield newTransaction.save();
        // Como solo hay un registo en la coleccion FinancialSummary, no es necesario filtrar por id se indica {}
        // upsert: true (insert if not exists) y new: true (return the updated document)
        // El operador: $inc incrementa el valor de un campo en un documento.
        const field = newTransaction.type === 'Ingreso' ? 'total_incomes' : 'total_expenses';
        yield financial_summary_model_1.FinancialSummary.findOneAndUpdate({}, { $inc: { [field]: newTransaction.amount } }, { upsert: true });
        res.status(201).json({ message: 'Transaction created successfully', newTransaction });
    }
    catch (error) {
        console.log('Error creating Transaction', error);
        res.status(500).json({ message: 'Error creating Transaction', error });
    }
});
exports.newTransaction = newTransaction;
const getAllTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield transations_model_1.default.find({});
        if (!transactions) {
            res.status(404).json({ message: 'Transactions not found' });
        }
        res.status(200).json({ message: 'Transactions: ', transactions });
    }
    catch (error) {
        console.log('Error getting Transactions', error);
        res.status(500).json({ message: 'Error getting Transactions', error });
    }
});
exports.getAllTransactions = getAllTransactions;
const getTransactionsByMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { month } = req.params;
        if (!month) {
            res.status(400).json({ message: `No se ha informado un mes valido: ${month}` });
            return;
        }
        const monthNumber = parseInt(month, 10); // Convertir el mes a un número entero
        // validar que el mes sea un número entre 1 y 12
        if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
            res.status(400).json({ message: 'Invalid month' });
            return;
        }
        // Obtiene las transacciones del mes indicado
        const transactions = yield transations_model_1.default.find({ $expr: {
                $eq: [{ $month: "$date" }, monthNumber] // Filtrar por el mes
            }
        });
        if (!transactions) {
            res.status(204).json({ message: 'No se han encontrado operaciones para el mes indicado' });
        }
        res.status(200).json({ message: 'Transactions: ', transactions });
    }
    catch (error) {
        console.log('Error obteniendo transacciones', error);
        res.status(500).json({ message: 'error obteniendo transacciones', error });
    }
});
exports.getTransactionsByMonth = getTransactionsByMonth;
const getTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const selectedTransaction = yield transations_model_1.default.findById(id);
        if (!selectedTransaction) {
            res.status(404).json({ message: `No se encontró Transaction con id: ${id}` });
        }
        res.status(200).json(selectedTransaction);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getTransaction = getTransaction;
const deleteTransactionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedTransaction = yield transations_model_1.default.findByIdAndDelete(id);
        if (!deletedTransaction) {
            res.status(404).json({ message: "este id no existe" });
            return;
        }
        yield financial_summary_model_1.FinancialSummary.findOneAndUpdate({}, { $inc: { [deletedTransaction.type === 'Ingreso' ? 'total_incomes' : 'total_expenses']: -deletedTransaction.amount } }, { upsert: true, new: true });
        res.status(200).json(deletedTransaction);
    }
    catch (error) {
        console.log('error', error);
        res.status(500).json(error);
    }
});
exports.deleteTransactionById = deleteTransactionById;
const loadTransations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = req.body;
        const { totalIncomes, totalExpenses } = (0, utils_1.calculateTotals)(transactions);
        yield financial_summary_model_1.FinancialSummary.findOneAndUpdate({}, { $inc: { ['total_incomes']: totalIncomes,
                ['total_expenses']: totalExpenses }
        }, { upsert: true, new: true });
        const insertedTransation = yield transations_model_1.default.insertMany(req.body);
        if (!insertedTransation) {
            res.status(404).json({ message: 'Transactions not found' });
        }
        res.status(201).json({ message: 'Transactions: ', insertedTransation });
    }
    catch (error) {
        console.error('Error inserting transactions:', error);
        res.status(500).json({ message: 'Error inserting transactions', error });
    }
});
exports.loadTransations = loadTransations;
