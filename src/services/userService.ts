import { compare, hash } from "bcrypt";
import { LoginDto, RegisterDto } from "../types/dto/registerUser";
import userModel from "../models/userModel";
import { IUser } from "../types/interface/Iuser";
import Jwt from "jsonwebtoken";
import PayloadDto from "../types/dto/payload";
import CartModel from "../models/cartModel";

export const createNewUser = async (
  newUser: RegisterDto
): Promise<IUser | undefined> => {
  try {
    const { username, password, creditCard } = newUser;
    if (!username || !password || !creditCard) {
      throw new Error("All fileds are required");
    }
    const hashPassword = await hash(password, 10);
    if (!hashPassword) {
      throw new Error("something went wrong with hashing password");
    }
    const user = new userModel({
      username,
      password: hashPassword,
      creditCard,
    });
    return await user.save();
  } catch (error) {
    throw new Error("Can't do the thing you want me to do");
  }
};
export const userLogin = async (user: LoginDto) => {
  try {
    if(!user.password || !user.username){
      throw new Error("All filied arw required");
      
    }
    const userFromDb = await userModel
      .findOne({ username: user.username })
      .lean();
    if (!userFromDb) {
      throw new Error("User not found");
    }
    const match = await compare(user.password, userFromDb.password);
    if (!match){
      throw new Error("Worng password");
    } 
    const payload: PayloadDto = {
      userId: userFromDb._id as string,
      creditCard: userFromDb.creditCard,
      username: userFromDb.username,
    };
    const token = Jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "10m",
    });

    return { ...userFromDb, token, password: "********" };
  } catch (error) {
    throw error;
  }
};

export const getProfileService = async (user: LoginDto) => {
  try {
    const userFromDb = await userModel.findOne({ username: user.username }).lean();
    const cartsfromDb  = await CartModel.find({user_id: userFromDb?.id}).lean()
    const carts = cartsfromDb.map((cart)=>{return {receipt:cart.receipt, date: cart.date} } )

    return { ...userFromDb, password: "********", carts: carts };
  } catch (error) {
    return error;
  }
};
export const autoVerifyService = async (user_id: string) => {
  try {
    const userFromDb = await userModel.findOne({ _id:user_id }).lean()
    if (!userFromDb) {
      throw new Error("User not found");
    }
    const payload: PayloadDto = {
      userId: userFromDb._id as string,
      creditCard: userFromDb.creditCard,
      username: userFromDb.username,
    };
    const token = Jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "10m",
    });

    return { ...userFromDb, token, password: "********" };
  } catch (error) {
    throw error
}
};
