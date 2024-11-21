import ProductModel from "../models/productModel";

export const getByNameService = async (name: string) => {
    try {
        const result = await ProductModel.find({name: name}).lean();
        return result;
    } catch (error) {
        return error;
    }
}