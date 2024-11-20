import { hash } from "bcrypt";
import { RegisterDto } from "../types/dto/registerUser";
import userModel from "../models/userModel";
import { IUser } from "../types/interface/Iuser";

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
