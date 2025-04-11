import express from 'express';
import {newTransation} from '../controllers/transations.controller';
const transationsRouter = express.Router();

transationsRouter.post('/new-transation', newTransation);

export default transationsRouter;