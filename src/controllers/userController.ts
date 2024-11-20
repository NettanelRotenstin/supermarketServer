import { Request, Response } from "express";
import { createNewUser } from "../services/userService";

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
