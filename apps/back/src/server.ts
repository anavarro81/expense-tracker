import express from "express";
import 'dotenv/config'

import {connectDB} from './config/bd'

const app = express();

console.log('entro en server')

connectDB()

app.use(express.json())

app.use('/', (req, res) => {
    res.send('Server is running')
})

export default app;

