import mongoose, {Schema, Document, model} from "mongoose";

export interface ICategory {
    name: string;
    description: string;
    type: string;    
    userId: string;
}

// Existen categorias por defecto y categorias personalizadas
// Las categorias personalizadas tendrán un userId asociado
const CategorySchema = new Schema({
    name: {type: String, required: true, unique: true, trim: true},
    description: {type: String, required: false},
    type: {type: String, required: true, enum: ['default', 'custom']},
    userId: {type: Schema.Types.ObjectId, required: false, default: null }, 

},{
    timestamps: true,    
})

const CategoryModel = model<ICategory>("Category", CategorySchema);
export default CategoryModel;