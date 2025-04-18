

export const calculateTotals = (transactions: any[]) => {
    let totalIncomes = 0;
    let totalExpenses = 0;

    for (const transation of transactions) {
        if (transation.type === 'Ingreso') totalIncomes += transation.amount;
        if (transation.type === 'Gasto')  totalExpenses += transation.amount;
    }

    return { totalIncomes, totalExpenses };
}