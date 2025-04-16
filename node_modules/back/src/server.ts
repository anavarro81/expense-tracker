import express from "express";
import 'dotenv/config'
import {connectDB} from './config/bd'
import categoriesRoute from "./routes/Categories.route";
const app = express();
import transactionsRoute from './routes/transations.routers'

connectDB()

app.use(express.json())

// app.use('/', (req, res) => {
//     res.send('Server is running')
// })

console.log('Server is running...');

app.use('/categories', categoriesRoute)
app.use('/transations', transactionsRoute);

export default app;

