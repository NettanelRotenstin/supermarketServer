import ProductModel, { productSchema } from "../models/productModel";
import productsForCeed from "../db/products.json";

export const getByNameService = async (name: string) => {
    try {
        const result = await ProductModel.find({ name: name }).where("name").regex(name).lean();        
        
        return result;
    } catch (error) {
        return error;
    }
};

export const getAllProdutsService = async () => {
    try {
        const result = await ProductModel.find({}).lean();
        return result;
    } catch (error) {
        return error;
    }
};
export const getProdutsByCategoryService = async (nameOfCategory: string) => {
    try {
        const result = await ProductModel.find({
            category: nameOfCategory,
        }).lean();
        return result;
    } catch (error) {
        return error;
    }
};

export const ceed = async () => {
    try {
        const productCount = await ProductModel.countDocuments();
        if (productCount == 0) {
            productsForCeed.map(async (prod) => {
                const newProd = new ProductModel(prod);
                await newProd.save();
            });
        }
    } catch (error) {
    }
};
