import ProductModel from "../models/productModel";

export const getByNameService = async (name: string) => {
    try {
        const result = await ProductModel.find({ name: name }).lean();
        return result;
    } catch (error) {
        return error;
    }
};

export const getAllProduts = async (name: string) => {
    try {
        const result = await ProductModel.find({}).lean();
        return result;
    } catch (error) {
        return error;
    }
};
export const getProdutsByCategory = async (nameOfCategory: string) => {
    try {
        const result = await ProductModel.find({category: nameOfCategory}).lean();
        return result
    } catch (error) {
        return error;
    }
};
