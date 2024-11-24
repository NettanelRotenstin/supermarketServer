import { Document, Model, model, Schema } from "mongoose";
import { categoryEnum } from "../types/enum/category";

export interface IProduct extends Document {
  name: string;
  img?: string;
  category: categoryEnum;
  price: number;
  quantity: number;
  prevPrice?: Number;
  description: string;
}

export const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String
  },
  category: {
    type: String,
    required: true,
    enum: [
      categoryEnum.Dry,
      categoryEnum.Fruits,
      categoryEnum.Meat,
      categoryEnum.Drink,
      categoryEnum.Milk,
      categoryEnum.Vegetables,
      categoryEnum.Fish,
    ],
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  prevPrice: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
});

const ProductModel: Model<IProduct> = model<IProduct>("Product", productSchema);

export default ProductModel;
