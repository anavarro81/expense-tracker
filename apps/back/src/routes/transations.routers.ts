import express from "express";
import { Request, Response } from 'express';
import { 
        newTransaction, 
        getAllTransactions, 
        getTransaction, 
        deleteTransactionById, 
        loadTransations,
        getTransactionsByMonth
        } 
        from "../controllers/transations.controller";

const transactionsRoute = express.Router();

transactionsRoute.post("/", newTransaction);
transactionsRoute.post("/load-transations", loadTransations);
transactionsRoute.get("/", getAllTransactions);



transactionsRoute.get("/month", (req: Request, res: Response) => {
    console.log('Error en la ruta de mes')
    res.status(400).json({ message: "Mes no informado" });
});
transactionsRoute.get("/month/:month", getTransactionsByMonth);


transactionsRoute.get("/:id", getTransaction);





export default transactionsRoute;
