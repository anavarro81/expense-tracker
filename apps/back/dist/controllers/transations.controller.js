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
exports.loadTransations = exports.getTopExpenses = exports.getTransactionsByWeek = void 0;
const transations_model_1 = __importDefault(require("../models/transations.model"));
const financial_summary_model_1 = require("../models/financial_summary.model");
const utils_1 = require("../utils/utils");
console.log('Entro en transations.controller.ts');
// interface GetTxQuery {
//     // Obligamos a que month sea un string
//     month: string;
//     sort?: 'asc' | 'desc';
//     limit?: string;
//   }
const getTransactionsByWeek = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Entro en getTransactionsByWeek');
    try {
        // const {month} = req.params;
        const weeksOfMonth = (0, utils_1.getWeeksInMonth)(3, 2025);
        res.status(200).json({ message: 'Todo OK' });
    }
    catch (error) {
        res.status(500).json({ message: 'error obteniendo transacciones', error });
    }
});
exports.getTransactionsByWeek = getTransactionsByWeek;
// export const newTransaction = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const newTransaction = new TransactionModel(req.body);
//         await newTransaction.save();
//         // Como solo hay un registo en la coleccion FinancialSummary, no es necesario filtrar por id se indica {}
//         // upsert: true (insert if not exists) y new: true (return the updated document)
//         // El operador: $inc incrementa el valor de un campo en un documento.
//         const field = newTransaction.type === 'Ingreso' ? 'total_incomes' : 'total_expenses';
//         await   FinancialSummary.findOneAndUpdate(
//         {}, 
//         { $inc: { [field]: newTransaction.amount } }, 
//         { upsert: true })
//         res.status(201).json({ message: 'Transaction created successfully', newTransaction });
//     } catch (error) {
//         console.log('Error creating Transaction', error);
//         res.status(500).json({ message: 'Error creating Transaction', error });
//     }
// };
// export const getAllTransactions = async (
//     req: Request<{}, any, any, GetTxQuery>, 
//     res: Response)
//     : Promise<void> => {
//     console.log('Entro en getAllTransactions')
//     try {
//         let monthRaw = req.query.month
//         const result = validateMonth(monthRaw)
//         if (result.status === false) {
//             res.status(400).json({ message: result.message });
//         }
//        const transactions = await TransactionModel.find(
//             { $expr: {
//                 $eq: [{ $month: "$date" }, result.month] // Filtrar por el mes
//             }
//         })
//         .sort({ date: req.query.sort === 'asc' ? 1 : -1 })
//         if (transactions.length === 0) {
//             res.status(404).json({ message: 'Transactions not found' });
//         }
//         res.status(200).json({ message: 'Transactions: ', transactions });
//     } catch (error) {
//         console.log('Error getting Transactions', error);
//         res.status(500).json({ message: 'Error getting Transactions', error });
//     }
// };
// export const getTransactionsByMonth = async (req: Request, res: Response): Promise<void> => {
//       try {               
//         console.log('req.query', req.query)
//         getWeeksInMonth(3, 2025)
//         // const {month} = req.params;
//         // const result = validateMonth(month)
//         // if (result.status === false) {
//         //     res.status(400).json({ message: result.message });
//         // }
//         // const transactions = await TransactionModel.find(
//         //     { $expr: {
//         //         $eq: [{ $month: "$date" }, result.month] // Filtrar por el mes
//         //     }
//         // });
//         // if (!transactions) {
//         //     res.status(204).json({ message: 'No se han encontrado operaciones para el mes indicado' });
//         // }
//         // res.status(200).json({ message: 'Transactions: ', transactions });
//         res.status(200).json({ message: 'Todo OK'});
//       } catch (error) {
//         console.log('Error obteniendo transacciones', error);
//         res.status(500).json({ message: 'error obteniendo transacciones', error });
//       }  
// }
const getTopExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('Entro en getTopExpenses');
    const { month } = req.params;
    console.log('month >> ', month);
    try {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const { month } = req.params;
        const result = (0, utils_1.validateMonth)(month);
        if (result.status === false) {
            res.status(400).json({ message: result.message });
        }
        if (!result.month) {
            res.status(400).json({ message: 'El mes no es correcto' });
            return;
        }
        // Se obtiene el primer y último día del mes indicado
        const startDate = new Date(currentYear, result.month - 1, 1); // Primer día del mes
        const endDate = new Date(currentYear, result.month, 0); // Último día del mes
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
        console.log('amountTotal', amountTotal);
        if (amountTotal === 0) {
            console.log('No se han encontrado operaciones para el mes indicado');
            res.status(404).json({ message: 'No se han encontrado operaciones para el mes indicado' });
        }
        // Se obtienen las transacciones del mes indicado, ordenadas por cantidad de forma descendente 
        // y limitadas a 5 resultados.
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
                amount: transation.amount,
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
// export const getTransaction = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { id } = req.params;
//         const selectedTransaction = await TransactionModel.findById(id);
//         if (!selectedTransaction) {
//             res.status(404).json({ message: `No se encontró Transaction con id: ${id}` });
//         }
//         res.status(200).json(selectedTransaction);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };
// export const deleteTransactionById = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { id } = req.params;
//         const deletedTransaction = await TransactionModel.findByIdAndDelete(id);
//         if (!deletedTransaction) {
//             res.status(404).json({ message: "este id no existe" });
//             return
//         }
//         await FinancialSummary.findOneAndUpdate(
//             {}, 
//             { $inc: { [deletedTransaction.type === 'Ingreso' ? 'total_incomes' : 'total_expenses']: -deletedTransaction.amount } }, 
//             { upsert: true, new: true }
//         )
//         res.status(200).json(deletedTransaction);
//     } catch (error) {
//         console.log('error', error);
//         res.status(500).json(error);
//     }
// };
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
