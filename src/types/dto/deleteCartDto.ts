import { Types } from "mongoose";

export interface DelteteCartDto {
  userId: string | Types.ObjectId;
  productName: string;
}
