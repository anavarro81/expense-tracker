// Se importan los tipos
import mongoose, { Schema, model, Document } from "mongoose";

// Se crea un interfaz con los datos del usuario y sus tipos
export interface ITotals {
    totalIncome: number;
    totalExpense: number;
    
}   


const TotalsSchema = new Schema({    

    totalIncome: {
        type: String,
        required: true,     	    
    },
    totalExpense: {
        type: String,
        required: true,     	    
    },


},
    {
        timestamps: true   // Añade los campos createdAt y updatedAt
    }
);
// Se utiliza un Generics para indicar que el interface IUser es el que se va a utilizar
const Totals = model<ITotals>('Totals', TotalsSchema);
export default Totals;