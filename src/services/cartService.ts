import { Types } from "mongoose";
import CartModel from "../models/cartModel";
import ProductModel from "../models/productModel";
import { CartDto } from "../types/dto/cartDto";
import { DelteteCartDto } from "../types/dto/deleteCartDto";
import { PaymentDto } from "../types/dto/dtoPayment";
import { HistoryDto } from "../types/dto/historyDto";

export const cancelCartService = async (id: string) => {
  try {
    const cart = await CartModel.findById(id);
    if (!cart) {
      throw new Error("Cart not found");
    }

    for (const item of cart.receipt) {
      const product = await ProductModel.findById(item.idproduct);
      if (product) {
        product.quantity += item.quantity;
        await product.save();
      } else {
        console.warn(`Product with ID ${item.idproduct} not found`);
      }
    }
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

export const removeFromCart = async (
  deleteCart: DelteteCartDto
): Promise<void> => {
  try {
    const product = await ProductModel.findOne({
      name: deleteCart.productName,
    });
    if (!product) {
      throw new Error("No such product exists.");
    }

    const cart = await CartModel.findOne({
      user_id: deleteCart.userId,
      isPaid: false,
    });
    if (!cart) {
      throw new Error("No active cart found for this user.");
    }

    const itemIndex = cart.receipt.findIndex(
      (item) => item.idproduct === product._id
    );
    if (itemIndex === -1) {
      throw new Error("Product not found in cart.");
    }

    const item = cart.receipt[itemIndex];
    cart.receipt.splice(itemIndex, 1);

    cart.totalPrice -= item.price * item.quantity;

    await cart.save();

    product.quantity += item.quantity;
    await product.save();
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};
export const checkoutCart = async (payment: PaymentDto): Promise<void> => {
  try {
    if (!payment.creditCard) {
      throw new Error("Credit card is required.");
    }
    const cart = await CartModel.findOne({
      user_id: payment.userId,
      isPaid: false,
    }).populate("user_id") as any;

    if (!cart) {
      throw new Error("No active cart found for this user.");
    }
    if(cart.user_id.creditCard !== payment.creditCard){
      throw new Error("Wrong credit card");}

    if (!cart.receipt.length) {
      throw new Error("Cannot checkout an empty cart.");
    }

    cart.isPaid = true;

    await cart.save();

    console.log("Cart checked out successfully.");
  } catch (error) {
    console.error("Error during checkout:", error);
    throw error;
  }
};
export const getHistory = async (user: HistoryDto) => {
  try {
    const cart = await CartModel.findOne({
      user_id: user.userId,
      isPaid: true,
    }).lean();
    return cart?.receipt;
  } catch (error) {
    return error;
  }
};
