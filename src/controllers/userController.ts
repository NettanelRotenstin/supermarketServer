import { Request, Response } from "express";

export const register = async (req: Request, res: Response):Promise<void> => {
  try {
    res.status(201).json({
      msg: "user created succesfull",
      err: false,
    });
  } catch (error) {
    res.status(400).json({
      msg: "something went wrong",
      err: true,
    });
  }
};
