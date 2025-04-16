import mongoose, { Schema, Document, model } from "mongoose";

export interface ICategory extends Document {
    name: string;
    description?: string;
    type: 'default' | 'custom';
    userId?: mongoose.Schema.Types.ObjectId | null;
}

const CategorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ['default', 'custom'], required: true },
    userId: { type: Schema.Types.ObjectId, default: null, ref: 'User' }
}, {
    timestamps: true,
});

const CategoryModel = model<ICategory>("Category", CategorySchema);
export default CategoryModel;
