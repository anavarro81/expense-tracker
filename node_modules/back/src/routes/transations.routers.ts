import express from "express";
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
transactionsRoute.get("/:id", getTransaction);
transactionsRoute.get("/:id", getTransaction);
transactionsRoute.get("/month/:month", getTransactionsByMonth);


export default transactionsRoute;
