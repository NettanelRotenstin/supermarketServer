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

    if (product.quantity <= 0) {
      throw new Error(
        "The product is out of stock or insufficient quantity available."
      );
    }

    let cart = await CartModel.findOne({ user_id: Cart.userId, isPaid: false });

    if (!cart) {
      cart = new CartModel({
        user_id: Cart.userId,
        totalPrice: 0,
        receipt: [],
        isPaid: false,
      });
    }

    const existingItemIndex = cart.receipt.findIndex(
      (item) =>
        item.idproduct.toString() === (product._id as Types.ObjectId).toString()
    );

    if (existingItemIndex !== -1) {
      cart.receipt[existingItemIndex].quantity += 1;
    } else {
      const newItem = {
        idproduct: product._id as Types.ObjectId,
        quantity: Cart.quantity,
        price: product.price,
      };
      cart.receipt.push(newItem);
    }

    cart.totalPrice += product.price * Cart.quantity;

    await cart.save();

    product.quantity -= Cart.toggelQuantity ? 1 : Cart.quantity;

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
    console.log(deleteCart);

    const product = await ProductModel.findOne({
      name: deleteCart.productName,
    });
    console.log(product);

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
    console.log(cart);

    const itemIndex = cart.receipt.findIndex((item) =>
      item.idproduct.equals(product._id as Types.ObjectId)
    );
    console.log("Product ID:", product._id);
    console.log(
      "Receipt IDs:",
      cart.receipt.map((item) => item.idproduct)
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

    const cart = (await CartModel.findOne({
      user_id: payment.userId,
      isPaid: false,
    }).populate("user_id")) as any;

    if (!cart) {
      throw new Error("No active cart found for this user.");
    }

    

    if (!cart.receipt || cart.receipt.length === 0) {
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
export const decreaseQuantity = async (
  cartToDel: DelteteCartDto
): Promise<void> => {
  try {
    const product = await ProductModel.findOne({
      name: cartToDel.productName,
    });
    if (!product) {
      throw new Error("No such product exists.");
    }

    const cart = await CartModel.findOne({
      user_id: cartToDel.userId,
      isPaid: false,
    });
    if (!cart) {
      throw new Error("No active cart found for this user.");
    }

    const itemIndex = cart.receipt.findIndex(
      (item) =>
        item.idproduct.toString() === (product._id as Types.ObjectId).toString()
    );
    if (itemIndex === -1) {
      throw new Error("Product not found in cart.");
    }

    const item = cart.receipt[itemIndex];

    if (item.quantity === 1) {
      cart.receipt.splice(itemIndex, 1);
    } else {
      item.quantity -= 1;
    }

    cart.totalPrice -= item.price;

    await cart.save();

    product.quantity += 1;
    await product.save();
  } catch (error) {
    console.error("Error decreasing quantity in cart:", error);
    throw error;
  }
};
export const getHistory = async (user: HistoryDto) => {
  try {
    const carts = await CartModel.find({
      user_id: user.userId,
      isPaid: true,
    }).lean();

    if (carts.length === 0) {
      throw new Error("No paid carts found.");
    }

    return carts.map((cart) => cart.receipt).flat();
  } catch (error) {
    console.error("Error retrieving history:", error);
    throw error;
  }
};
export const getActionById = async (id: string) => {
  try {
    const userCart = await CartModel.findOne({
      user_id: id,
      isPaid: false,
    }).populate("receipt.idproduct");

    return userCart;
  } catch (error) {
    console.error("Error in getActionById:", error);
    throw error;
  }
};
