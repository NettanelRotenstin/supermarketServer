import { connect } from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config({
    path:  process.env.NODE_ENV === 'production' 
    ? '.env'
    : '.env.staging',
    override: true
});
export const connectDB = async () => {
    try {
        await connect(process.env.MONGODB_URI as string);
    } catch (error) {
    }
}