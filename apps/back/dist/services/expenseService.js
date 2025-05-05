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
exports.getTotalAmountByMonth = exports.getAmountsByWeek = exports.getTransationsInMonth = void 0;
const utils_1 = require("../utils/utils");
const transations_model_1 = __importDefault(require("../models/transations.model"));
const getTransationsInMonth = (month, year) => __awaiter(void 0, void 0, void 0, function* () {
    const monthNumber = parseInt(month);
    const firstDayOfMonth = new Date(year, monthNumber - 1, 1);
    const lastDayOfMonth = new Date(year, monthNumber, 0);
    // Obtiene el mes y su abreviatura con tres letras
    const { monthName, monthStart } = (0, utils_1.getmonthName)(monthNumber);
    console.log('monthName, monthStart: ', monthName, monthStart);
    // Obtiene un array con el primer y último día de cada semana del mes
    const firstAndLastDays = (0, utils_1.getFirstAndLastsDaysOfMonth)(firstDayOfMonth, lastDayOfMonth);
    console.log('firstAndLastDays: ', firstAndLastDays);
    const totalExpenses = yield (0, exports.getTotalAmountByMonth)(monthNumber, 2025);
    console.log('totalExpenses: ', totalExpenses);
    const transations = yield (0, exports.getAmountsByWeek)(monthNumber, year);
    console.log('transations: ', transations);
    const weeklyExpense = transations.map((transation, index) => {
        return {
            week: monthStart + ` S` + (index + 1),
            weeekRange: firstAndLastDays[index][0].toString() + '-' + firstAndLastDays[index][1].toString() + ' ' + monthName, // rango de fechas de la semana       
            totalAmount: transation.totalAmount,
            percentage: ((transation.totalAmount / totalExpenses) * 100).toFixed(0) + '%' // porcentaje del gasto de la semana respecto al total del mes
        };
    });
    console.log('weeklyExpense: ', weeklyExpense);
});
exports.getTransationsInMonth = getTransationsInMonth;
// Obtiene el gasto agupado pr semana del mes
const getAmountsByWeek = (month, year) => __awaiter(void 0, void 0, void 0, function* () {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);
    const transations = yield transations_model_1.default.aggregate([
        // 1) Filtramos por fecha dentro del mes
        { $match: {
                date: { $gte: firstDayOfMonth, $lt: lastDayOfMonth }
            }
        },
        {
            $group: {
                _id: {
                    $dateTrunc: {
                        date: "$date", // Agrupamos por fecha
                        unit: "week", // Agrupamos por semana
                        binSize: 1, // Agrupamos de una en una semana
                        startOfWeek: "mon" // Indica el inicio de la semana
                    }
                },
                totalAmount: { $sum: "$amount" }
            }
        },
        // 4) Ordenamos por semana ascendente
        { $sort: { _id: 1 } }
    ]);
    return transations;
});
exports.getAmountsByWeek = getAmountsByWeek;
const getTotalAmountByMonth = (month, year) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Obtiene el gasto total del mes. 
    // $group agrupa y suma el importe: amount
    try {
        const result = yield transations_model_1.default.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: [{ $month: "$date" }, month] },
                            { $eq: [{ $year: "$date" }, year] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);
        return ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.totalAmount) || 0;
    }
    catch (error) {
        console.log('Error obteniendo el total de transacciones', error);
        throw new Error(`Error al obtener el total de transacciones: ${error}`);
    }
});
exports.getTotalAmountByMonth = getTotalAmountByMonth;
