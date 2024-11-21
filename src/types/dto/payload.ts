import { Types } from "mongoose";

interface PayloadDto {
  userId: string | Types.ObjectId ;
  creditCard?: string;
  username: string;
}
export default PayloadDto;
