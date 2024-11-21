import { Request, Response } from "express";
import { getByNameService, getAllProdutsService, getProdutsByCategoryService } from "../services/productService";

export const getProductByName = async (req: Request, res: Response):Promise<void> => {
    try {
        const result = await getByNameService(req.params.name)
        res.status(201).json({
            msg: "user login succesfull",
            err: false,
            data:result
        });
    } catch (error) {
        res.status(400).json({
            msg: "something went wrong",
            err: true,
            data:null
        });
    }
};
export const getProdutsByCategory = async (req: Request, res: Response):Promise<void> => {
    try {
        const result = await getProdutsByCategoryService(req.params.name)
        res.status(201).json({
            msg: "user login succesfull",
            err: false,
            data:result
        });
    } catch (error) {
        res.status(400).json({
            msg: "something went wrong",
            err: true,
            data:null
        });
    }
};
export const getAllProducts = async (req: Request, res: Response):Promise<void> => {
    try {
        const result = await getAllProdutsService()
        res.status(201).json({
            msg: "user login succesfull",
            err: false,
            data:result
        });
    } catch (error) {
        res.status(400).json({
            msg: "something went wrong",
            err: true,
            data:null
        });
    }
};