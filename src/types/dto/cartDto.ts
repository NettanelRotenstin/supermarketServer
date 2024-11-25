import { Types } from "mongoose";

export interface CartDto {
  userId: string | Types.ObjectId;
  prodactName: string;
  quantity: number;
  toggelQuantity:boolean
}
