import { Request, Response } from 'express';
import TransactionModel from '../models/transations.model';
import { FinancialSummary } from '../models/financial_summary.model';
import {getTransationsInMonth} from '../services/expenseService';
import {calculateTotals, validateMonth, getCurrencySymbol} from '../utils/utils';




// interface GetTxQuery {
//     // Obligamos a que month sea un string
//     month: string;
//     sort?: 'asc' | 'desc';
//     limit?: string;
//   }

  export const getTransactionsByWeek = async (req: Request, res: Response): Promise<void> => {
    
    console.log('Entro en getTransactionsByWeek')
    
    try {
        
        let {month} = req.params;     

        const weeks= getTransationsInMonth(month, 2025)


        res.status(200).json({ message: 'Todo OK'});
        
    } catch (error) {
        res.status(500).json({ message: 'error obteniendo transacciones', error });
    }
}





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
