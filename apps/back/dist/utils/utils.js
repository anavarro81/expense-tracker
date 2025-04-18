"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotals = void 0;
const calculateTotals = (transactions) => {
    let totalIncomes = 0;
    let totalExpenses = 0;
    for (const transation of transactions) {
        if (transation.type === 'Ingreso')
            totalIncomes += transation.amount;
        if (transation.type === 'Gasto')
            totalExpenses += transation.amount;
    }
    return { totalIncomes, totalExpenses };
};
exports.calculateTotals = calculateTotals;
