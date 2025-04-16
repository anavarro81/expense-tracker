import mongoose, { Schema, Document, model } from "mongoose";

export interface ITransaction extends Document {
    name: string;
    type: "Ingreso" | "Gasto";
    percentage?: number;
    category: string;
    notes?: string;
    amount: number;
    date?: Date;
    currency: string;
}

const TransactionSchema = new Schema<ITransaction>({
    name: { type: String, required: true },
    type: { type: String, required: true, enum: ["Ingreso", "Gasto"] },
    percentage: { type: Number },
    category: { type: String, required: true },
    notes: { type: String },
    amount: { type: Number, required: true },
    date: { type: Date },
    currency: { type: String, required: true },
}, {
    timestamps: true,
});

const TransactionModel = model<ITransaction>("Transaction", TransactionSchema);
export default TransactionModel;
