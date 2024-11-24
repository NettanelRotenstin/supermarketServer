import { Request, Response } from "express";
import {
    autoVerifyService,
    createNewUser,
    getProfileService,
    userLogin,
} from "../services/userService";
import RequestWithUser from "../types/dto/RequestWithUser";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await createNewUser(req.body);
        res.status(201).json({
            msg: "user created succesfull",
            err: false,
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            msg: "something went wrong",
            err: true,
            data: null,
        });
    }
};
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await userLogin(req.body);
        res.status(201).json({
            msg: "user login succesfull",
            err: false,
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            msg: "something went wrong",
            err: true,
            data: null,
        });
    }
};
export const getProfile = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const result = await getProfileService(req.body);
        res.status(200).json({
            msg: "get profile",
            err: false,
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            msg: "something went wrong",
        });
    }
};

export const autoVerify = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user_id = (req as RequestWithUser).user.userId;
        const result = await autoVerifyService(user_id as string);
        res.status(201).json({
            msg: "user login succesfull",
            err: false,
            data: result,
        });
    } catch (error: any) {
        res.status(400).json({
            msg: error.message,
            err: true,
            data: null,
        });
    }
};
