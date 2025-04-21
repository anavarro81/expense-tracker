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
// Se usa el caracter ? para poder validar que no se mande el mes
transactionsRoute.get("/month/:month", getTransactionsByMonth);


transactionsRoute.get("/:id", getTransaction);





export default transactionsRoute;
