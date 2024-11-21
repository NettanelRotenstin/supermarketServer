import { Types } from "mongoose";

export interface PaymentDto{
    userId: string | Types.ObjectId
    creditCard:string
}