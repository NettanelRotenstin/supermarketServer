import ProductModel from "../models/productModel";
import productsForCeed from '../db/products.json'

export const getByNameService = async (name: string) => {
    try {
        const result = await ProductModel.find({ name: name }).lean();
        return result;
    } catch (error) {
        return error;
    }
};

export const getAllProdutsService  = async () => {
    try {
        const result = await ProductModel.find({}).lean();        
        return result;
    } catch (error) {
        return error;
    }
};
export const getProdutsByCategoryService  = async (nameOfCategory: string) => {
    try {
        const result = await ProductModel.find({category: nameOfCategory}).lean();
        return result
    } catch (error) {
        return error;
    }
};

export const ceed = async () => {
    try {
        productsForCeed.map(async (prod) => {
            const newProd = new ProductModel(prod);
            await newProd.save();
        });
    } catch (error) {
        console.log("error in ceed")
    }
}