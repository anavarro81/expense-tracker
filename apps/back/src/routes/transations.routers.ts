import express from "express";
import { Request, Response } from 'express';


import {
    getTransactionsByWeek, 
    loadTransations,        
    getTopExpenses,
    getAllTransactionsByMonth,} 
    from "../controllers/transations.controller";

const transactionsRoute = express.Router();

transactionsRoute.get('/:month', getAllTransactionsByMonth);
transactionsRoute.get('/top-expenses/:month', getTopExpenses);
transactionsRoute.get('/monthly-expenses/:month', getTransactionsByWeek);


// transactionsRoute.post("/", newTransaction);
transactionsRoute.post("/load-transations", loadTransations);






export default transactionsRoute;
