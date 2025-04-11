import mongoose, {Schema, model, Document} from "mongoose";

export interface iTransations{
    type: string;
    percentaje: number;
    category: string;
    description: string;
    amount: number;
    date: Date;
    Currency: string;
    user: string;
}

const transationsSchema = new Schema({
    type: 
        {type: String, 
        required: true,
        enum: ['ingreso', 'gasto']
        }, 

    percentaje: {type: Number, required: false},
    // La categoria debe ser de la coleccion de categorias
    category: 
        {type: Schema.Types.ObjectId,
        ref: 'Category', 
        required: true
        },  
    description: {type: String, required: false},
    amount: {type: Number, required: true},
    date: {type: Date, required: true},
    Currency: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
}, {
    timestamps: true
})

const Transations = model<iTransations >('Transations', transationsSchema)

export default Transations

