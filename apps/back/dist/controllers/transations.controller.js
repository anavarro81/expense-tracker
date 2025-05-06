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
exports.getAllTransactionsByMonth = exports.newTransaction = exports.loadTransations = exports.getTopExpenses = exports.getTransactionsByWeek = void 0;
const transations_model_1 = __importDefault(require("../models/transations.model"));
const financial_summary_model_1 = require("../models/financial_summary.model");
const expenseService_1 = require("../services/expenseService");
const utils_1 = require("../utils/utils");
// Obtiene el gasto agrupado por semana del mes 
const getTransactionsByWeek = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { month } = req.params;
        const expensesbyWeeok = yield (0, expenseService_1.getTransationsInMonth)(month, 2025);
        res.status(200).json(expensesbyWeeok);
    }
    catch (error) {
        res.status(500).json({ message: 'error obteniendo transacciones', error });
    }
});
exports.getTransactionsByWeek = getTransactionsByWeek;
// Obtiene los mayores gastos del mes indicado. 
const getTopExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const currentYear = new Date().getFullYear();
        const { month } = req.params;
        // Validate month
        let validatedMonth = (0, utils_1.validateMonth)(month);
        console.log('validatedMonth: ', validatedMonth);
        if (!validatedMonth || !validatedMonth.month) {
            res.status(400).json({ message: validatedMonth.message || "El mes no es correcto" });
            return;
        }
        // Validate currency
        const currentMonth = validatedMonth.month;
        // TODO: Por defecto se asume 
        const validCurrency = (0, utils_1.getCurrencySymbol)("EUR");
        if (!validCurrency.isOK) {
            res.status(400).json({ message: 'Divisa no válida' });
            return;
        }
        let currencyCode = validCurrency.currencyCode;
        // Se obtiene el primer y último día del mes indicado
        const startDate = new Date(currentYear, currentMonth - 1, 1); // Primer día del mes
        const endDate = new Date(currentYear, currentMonth, 0); // Último día del mes
        // Calcular total de gastos
        const total = yield transations_model_1.default.aggregate([
            {
                $match: {
                    date: { $gte: startDate, $lte: endDate },
                },
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" },
                },
            },
        ]);
        const amountTotal = ((_a = total[0]) === null || _a === void 0 ? void 0 : _a.totalAmount) || 0;
        if (amountTotal === 0) {
            console.log('No se han encontrado operaciones para el mes indicado');
            res.status(404).json({ message: 'No se han encontrado operaciones para el mes indicado' });
        }
        // Obtiene las transaciones cinco trasacciones de mayor importe. 
        const transations = yield transations_model_1.default.find({
            date: { $gte: startDate, $lte: endDate },
        })
            .sort({ amount: -1 }) // Ordenar por cantidad de forma descendente
            .limit(5); // Limitar a los 5 primeros resultados                
        if (transations.length === 0) {
            console.log('No se han encontrado operaciones para el mes indicado');
            res.status(404).json({ message: 'No se han encontrado operaciones para el mes indicado' });
        }
        const outputTransations = transations.map((transation) => {
            return {
                name: transation.name,
                date: transation.date,
                percentaje: `${Math.floor(transation.amount / amountTotal * 100)}%`,
                amount: `${currencyCode}${transation.amount} `
            };
        });
        res.status(200).json(outputTransations);
    }
    catch (error) {
        console.log('Error obteniendo transacciones', error);
        res.status(500).json({ message: 'error obteniendo transacciones', error });
    }
});
exports.getTopExpenses = getTopExpenses;
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
const getAllTransactionsByMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('getAllTransactionsByMonth >> ', req.params.month);
    try {
        const result = (0, utils_1.validateMonth)(req.params.month);
        if (!result.status) {
            res.status(400).json({ message: result.message });
            return;
        }
        if (!result.month) {
            res.status(400).json({ message: 'month not found' });
            return;
        }
        const transations = yield transations_model_1.default.find({
            date: {
                $gte: new Date(2025, result.month - 1, 1),
                $lt: new Date(2025, result.month, 1),
            },
        });
        console.log('transations >> ', transations);
        res.status(200).json(transations);
    }
    catch (error) {
        console.log('Error creating Transaction', error);
        res.status(500).json({ message: 'Error creating Transaction', error });
    }
});
exports.getAllTransactionsByMonth = getAllTransactionsByMonth;
