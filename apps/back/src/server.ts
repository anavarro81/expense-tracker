import express from "express";
import 'dotenv/config'
import {connectDB} from './config/bd'
import transationsRouter from './routes/transations.routers'
import categoriesRoute from "./routes/Categories.route";
const app = express();

connectDB()

app.use(express.json())

// app.use('/', (req, res) => {
//     res.send('Server is running')
// })

console.log('Server is running...');


app.use('/transations', transationsRouter)
app.use('/categories', categoriesRoute)

export default app;

