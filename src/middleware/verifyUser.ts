import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import RequestWithUser from "../types/dto/RequestWithUser"
import TokenPayloadDTO from "../types/dto/payload";

const verifyUser = async (
  req: RequestWithUser | Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("Token is missing");
    }
    const payload: TokenPayloadDTO = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    )as TokenPayloadDTO
    
    (req as RequestWithUser).user = payload
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      res.status(401).json({
        err: true,
        message: "Token expiered, please log in again",
        data: err,
      });
    } else {
      res.status(400).json({
        err: true,
        message: "Token is missing or curropted",
        data: (err as Error).message,
      });
    }
  }
};

export default verifyUser;
