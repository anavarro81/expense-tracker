import {Request, Response} from 'express';

import Transations from '../models/transations.model';

const newTransation = async (req: Request, res: Response): Promise<void> => {

    try {       

        const rewTransations = new Transations(req.body)
        const savedTransation = await rewTransations.save()
        res.status(201).json(savedTransation)

    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }

}

export {newTransation}
