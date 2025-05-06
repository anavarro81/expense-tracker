import { Request, Response } from 'express';
import TransactionModel from '../models/transations.model';
import { FinancialSummary } from '../models/financial_summary.model';
import {getTransationsInMonth} from '../services/expenseService';
import {calculateTotals, validateMonth, getCurrencySymbol} from '../utils/utils';


  // Obtiene el gasto agrupado por semana del mes 

  export const getTransactionsByWeek = async (req: Request, res: Response): Promise<void> => {
    
    
    
    try {
        
        let {month} = req.params;     

        const expensesbyWeeok= await getTransationsInMonth(month, 2025)


        res.status(200).json(expensesbyWeeok);
        
    } catch (error) {
        res.status(500).json({ message: 'error obteniendo transacciones', error });
    }
}



// Obtiene los mayores gastos del mes indicado. 

export const getTopExpenses = async (req: Request, res: Response): Promise<void> => {    
    
    
        
    try {
        
        const currentYear = new Date().getFullYear()

        const {month} = req.params;
        
        // Validate month
        let validatedMonth = validateMonth(month)

        console.log('validatedMonth: ', validatedMonth);
        

        if (!validatedMonth || !validatedMonth.month) {
            res.status(400).json({ message: validatedMonth.message || "El mes no es correcto" });
            return
        }

        // Validate currency

        const currentMonth = validatedMonth.month

        // TODO: Por defecto se asume 
        const validCurrency = getCurrencySymbol("EUR")        
        

        if (!validCurrency.isOK) {
            res.status(400).json({ message: 'Divisa no válida' });
            return
        }

        let currencyCode = validCurrency.currencyCode

        
        // Se obtiene el primer y último día del mes indicado
        const startDate = new Date(currentYear, currentMonth - 1, 1); // Primer día del mes
        const endDate = new Date (currentYear, currentMonth, 0); // Último día del mes
        
        // Calcular total de gastos
        const total = await TransactionModel.aggregate([
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
        ])

        const amountTotal = total[0]?.totalAmount || 0

        if (amountTotal === 0) {
            console.log('No se han encontrado operaciones para el mes indicado')
            res.status(404).json({ message: 'No se han encontrado operaciones para el mes indicado' });            
        }

        // Obtiene las transaciones cinco trasacciones de mayor importe. 
        const transations = await TransactionModel.find({
            date: { $gte: startDate, $lte: endDate },
        })
        .sort({ amount: -1 }) // Ordenar por cantidad de forma descendente
        .limit(5) // Limitar a los 5 primeros resultados                
        

        if (transations.length === 0) {
            console.log('No se han encontrado operaciones para el mes indicado')
            res.status(404).json({ message: 'No se han encontrado operaciones para el mes indicado' });            
            
        }

        const outputTransations = transations.map((transation) => {
            return {
                name: transation.name,
                date: transation.date,
                percentaje: `${Math.floor(transation.amount / amountTotal * 100)}%`,
                amount: `${currencyCode}${transation.amount} `
                

            }
        })


        res.status(200).json(outputTransations)

        

        
    } catch (error) {

        console.log('Error obteniendo transacciones', error);
        res.status(500).json({ message: 'error obteniendo transacciones', error });
        
    }
}



export const loadTransations = async (req: Request, res: Response): Promise<void> => {
    try {

        const transactions = req.body;         

        const { totalIncomes, totalExpenses } = calculateTotals(transactions);

        

        await FinancialSummary.findOneAndUpdate(
            {}, 
            { $inc: { ['total_incomes'] : totalIncomes 
                   ,['total_expenses'] : totalExpenses}
            }, 
            { upsert: true, new: true }
        )
        

        const insertedTransation = await TransactionModel.insertMany(req.body);

        if (!insertedTransation) {
            res.status(404).json({ message: 'Transactions not found' });
        }

        res.status(201).json({ message: 'Transactions: ', insertedTransation });
    
    } catch (error) {
        console.error('Error inserting transactions:', error);
        res.status(500).json({ message: 'Error inserting transactions', error });
    }
}

export const newTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const newTransaction = new TransactionModel(req.body);
        await newTransaction.save();


        // Como solo hay un registo en la coleccion FinancialSummary, no es necesario filtrar por id se indica {}
        // upsert: true (insert if not exists) y new: true (return the updated document)
        // El operador: $inc incrementa el valor de un campo en un documento.



        const field = newTransaction.type === 'Ingreso' ? 'total_incomes' : 'total_expenses';
        
        await   FinancialSummary.findOneAndUpdate(
        {}, 
        { $inc: { [field]: newTransaction.amount } }, 
        { upsert: true })


        res.status(201).json({ message: 'Transaction created successfully', newTransaction });
    } catch (error) {
        console.log('Error creating Transaction', error);
        res.status(500).json({ message: 'Error creating Transaction', error });
    }
};

export const getAllTransactionsByMonth  = async (req: Request, res: Response): Promise<void> => {

    console.log('getAllTransactionsByMonth >> ', req.params.month);
    

    try {

        const result = validateMonth(req.params.month)

        if (!result.status) {
            res.status(400).json({ message: result.message });
            return
        }

        if (!result.month) {
            res.status(400).json({ message: 'month not found' });
            return
        }

        const transations = await TransactionModel.find({
            date: {
                $gte: new Date(2025, result.month - 1, 1),
                $lt: new Date(2025, result.month, 1),
            },
        })
        
        console.log('transations >> ', transations);

        res.status(200).json(transations);
        
    } catch (error) {
        console.log('Error creating Transaction', error);
        res.status(500).json({ message: 'Error creating Transaction', error });

    }

}