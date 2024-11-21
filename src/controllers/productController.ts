import { Request, Response } from "express";
import { getByNameService } from "../services/productService";

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