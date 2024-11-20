import mongoose from "mongoose";
import { Document, model, ObjectId, Schema, Types } from "mongoose";
import { IUser } from "../types/interface/Iuser";



const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        index: true,
        lowercase: true,
        trim: true,
        minLength: [3, "Username must be at least 3 characters long"],
        maxLength: [20, "Username must be at most 20 characters long"]
    },
    password: { type: String, required: true },
    creditCard: { type: String, required: true }
})

export default model<IUser>("User", userSchema);