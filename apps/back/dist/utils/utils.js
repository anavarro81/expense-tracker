"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeeksInMonth = exports.validateMonth = exports.calculateTotals = void 0;
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
const validateMonth = (monthRaw) => {
    console.log('entro en validateMonth', monthRaw);
    if (Array.isArray(monthRaw)) {
        monthRaw = monthRaw[0];
    }
    if (typeof monthRaw !== 'string') {
        return { status: false, message: 'month must be a string' };
    }
    const month = parseInt(monthRaw, 10);
    if (!month || month < 1 || month > 12) {
        return { status: false, message: 'month must be an integer between 1 and 12' };
    }
    ;
    return { status: true, month: month };
};
exports.validateMonth = validateMonth;
const getWeeksInMonth = (month, year) => {
    let firstDayOfMonth = new Date(year, month - 1, 1);
    // Se pide el ultima dia del mes, por lo que se le resta 1 al mes
    const lastDayOfMonth = new Date(year, month, 0);
    console.log('firstDayOfMonth: ', firstDayOfMonth);
    console.log('lastDayOfMonth: ', lastDayOfMonth);
    const weeks = [];
    let currentWeek = [];
    for (let day = firstDayOfMonth; day <= lastDayOfMonth; day.setDate(day.getDate() + 1)) {
        currentWeek.push(new Date(day));
        if (currentWeek.length === 7 || day.getDate() === lastDayOfMonth.getDate() || day.getDay() === 0) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    }
    console.log('weeks: ', weeks);
    const firstandLastDays = [];
    for (let i = 0; i < weeks.length; i++) {
        const startDate = weeks[i][0].getDate();
        const endDate = weeks[i][weeks[i].length - 1].getDate();
        firstandLastDays.push([startDate.toString(), endDate.toString()]);
    }
    console.log('firstandLastDays: ', firstandLastDays);
    return weeks;
};
exports.getWeeksInMonth = getWeeksInMonth;
