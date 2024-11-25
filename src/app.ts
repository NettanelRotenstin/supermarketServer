import express, { Request, Response } from 'express';
import 'dotenv/config';
import { connectDB } from './db/config';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import userRouter from "./routers/userRouter"
import productRouter from "./routers/productRouter"
import verifyUser from './middleware/verifyUser';
import cartRouter from "./routers/cartRouter"

import { ceed } from './services/productService';
import { handelSocketConnection } from './socket/io';
import 'dotenv/config';
console.log('server start running');

const PORT = process.env.PORT || 3000;

export const app = express();
export const server = http.createServer(app);

app.use(cors());
connectDB();
app.use(express.json());

const seed = async () => await ceed()
seed();
app.get('/ping', (req: Request, res: Response) => {
    res.status(200).send('pong')});
app.use('/api/users', userRouter);
app.use('/api/cart',verifyUser,cartRouter);
app.use('/api/products', productRouter);
export const io = new Server(server,{ cors: { origin: "*" } });
io.on('connection',handelSocketConnection)
    



server.listen(PORT, () => console.log(`Listening on port ${PORT},visit http://localhost:${PORT}`));