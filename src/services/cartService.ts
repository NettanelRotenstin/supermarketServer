import { Types } from "mongoose";
import CartModel from "../models/cartModel";
import ProductModel from "../models/productModel";
import { CartDto } from "../types/dto/cartDto";

export const cancelCartService = async (id: string) => {
  try {
    const result = await CartModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    return error;
  }
};

export const addToCart = async (Cart: CartDto): Promise<void> => {
  try {
    const product = await ProductModel.findOne({ name: Cart.prodactName });
    if (!product) {
      throw new Error("No such product exists.");
    }

    if (product.quantity < Cart.quantity) {
      throw new Error(
        "The product is out of stock or insufficient quantity available."
      );
    }

    const newItem = {
      idproduct: product._id as Types.ObjectId,
      quantity: Cart.quantity,
      price: product.price,
    };

    let cart = await CartModel.findOne({ user_id: Cart.userId, isPaid: false });

    if (!cart) {
      cart = new CartModel({
        user_id: Cart.userId,
        totalPrice: 0,
        receipt: [],
        isPaid: false,
        date: new Date(),
      });
    }

    cart.receipt.push(newItem);

    cart.totalPrice += product.price * Cart.quantity;

    await cart.save();

    product.quantity -= Cart.quantity;
    await product.save();
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};
