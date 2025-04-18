import { Request, Response } from 'express';
import TransactionModel from '../models/transations.model';
import { FinancialSummary } from '../models/financial_summary.model';
import {calculateTotals} from '../utils/utils';

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

export const getAllTransactions = async (req: Request, res: Response): Promise<void> => {
    try {
        const transactions = await TransactionModel.find({});
        if (!transactions) {
            res.status(404).json({ message: 'Transactions not found' });
        }
        res.status(200).json({ message: 'Transactions: ', transactions });
    } catch (error) {
        console.log('Error getting Transactions', error);
        res.status(500).json({ message: 'Error getting Transactions', error });
    }
};

export const getTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const selectedTransaction = await TransactionModel.findById(id);
        if (!selectedTransaction) {
            res.status(404).json({ message: `No se encontró Transaction con id: ${id}` });
        }
        res.status(200).json(selectedTransaction);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteTransactionById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        
        const deletedTransaction = await TransactionModel.findByIdAndDelete(id);
        
        if (!deletedTransaction) {
            res.status(404).json({ message: "este id no existe" });
            return
        }

        await FinancialSummary.findOneAndUpdate(
            {}, 
            { $inc: { [deletedTransaction.type === 'Ingreso' ? 'total_incomes' : 'total_expenses']: -deletedTransaction.amount } }, 
            { upsert: true, new: true }
        )
        
        res.status(200).json(deletedTransaction);
    } catch (error) {
        console.log('error', error);
        res.status(500).json(error);
    }
};

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