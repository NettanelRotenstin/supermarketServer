import { Request, Response } from "express";
import { cancelCartService, checkoutCart } from "../services/cartService";

export const cancelCart = async (req: Request, res: Response):Promise<void> => {
    try {
        const result = await cancelCartService(req.params.id)
        res.status(201).json({
            msg: "cart canceled succesfull",
            err: false,
            data: result
        });
    } catch (error) {
        res.status(400).json({
            msg: "something went wrong",
            err: true,
            data: null
        });
    }
};
export const payCart = async (req: Request, res: Response):Promise<void> => {
    try {
        const result = await checkoutCart(req.body)
        res.status(201).json({
            msg: "cart canceled succesfull",
            err: false,
            data: result
        });
    } catch (error) {
        res.status(400).json({
            msg: "something went wrong",
            err: true,
            data: null
        });
    }
};