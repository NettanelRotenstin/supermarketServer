import mongoose, { Document, Model, model, Schema, Types } from "mongoose";

export interface ICart extends Document {
  user_id: Types.ObjectId;
  totalPrice: number;
  receipt: [{ idproduct: Types.ObjectId; quantity: number; price: number }];
  isPaid: boolean;
  date: Date;
}

export const cartSchema = new Schema<ICart>({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  receipt: {
    type: [
      {
        idproduct: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        price: Number,
      },
    ],
    required: true,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const CartModel: Model<ICart> = model<ICart>("Cart", cartSchema);

export default CartModel;
