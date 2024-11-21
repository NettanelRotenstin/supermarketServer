import CartModel from "../models/cartModel";

export const cancelCartService = async (id: string) => {
  try {
    const result = await CartModel.findByIdAndDelete(id);
    return result;
  } catch (error) {
    return error;
  }
};
