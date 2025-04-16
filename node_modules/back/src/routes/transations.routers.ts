import express from "express";
import { newTransaction, getAllTransactions, getTransaction, deleteTransactionById, loadTransations } from "../controllers/transations.controller";

const transactionsRoute = express.Router();

transactionsRoute.post("/", newTransaction);
transactionsRoute.post("/load-transations", loadTransations);
transactionsRoute.get("/", getAllTransactions);
transactionsRoute.get("/:id", getTransaction);
transactionsRoute.delete("/:id", deleteTransactionById);


export default transactionsRoute;
