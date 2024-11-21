import { Request } from "express";
import PayloadDto from "./payload"

export default interface RequestWithUser extends Request{
    user:PayloadDto
}