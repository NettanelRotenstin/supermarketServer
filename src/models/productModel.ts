import { Document, Model, model, Schema } from "mongoose";
import { category } from "../types/enum/category";

export interface IProduct extends Document {
    name: string;
    image?: string
    category: category;
    price: number;
    quantity: number;
}

export const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true,
        enum: [category.Dairy, category.Fruits, category.Grains, category.Nuts_and_Seeds, category.Sweets, category.Vegetables]
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const ProductModel: Model<IProduct> = model<IProduct>("Product", productSchema)

export default ProductModel