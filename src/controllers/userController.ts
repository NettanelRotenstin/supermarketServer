import { Request, Response } from "express";
import { createNewUser, getProfileService, userLogin } from "../services/userService";

export const register = async (req: Request, res: Response):Promise<void> => {
  try {
    const result = await createNewUser(req.body)
    res.status(201).json({
      msg: "user created succesfull",
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
export const login = async (req: Request, res: Response):Promise<void> => {
  try {
    const result = await userLogin(req.body)
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
export const getProfile = async (req: Request, res: Response):Promise<void> => {
  try {
    const result = await getProfileService(req.body)
    res.status(200).json({
      msg: "get profile",
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