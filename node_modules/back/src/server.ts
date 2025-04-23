import express from "express";
import 'dotenv/config'
import {connectDB} from './config/bd'
import categoriesRoute from "./routes/Categories.route";


import transactionsRoute from './routes/transations.routers'
import router from "./routes/financial_summary.routes";

connectDB()
const app = express();


app.use(express.json())


app.use('/categories', categoriesRoute)
app.use('/transations', transactionsRoute);
app.use('/financialSummary', router);

export default app;

