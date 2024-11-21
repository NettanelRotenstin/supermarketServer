import express from 'express';
import 'dotenv/config';
import { connectDB } from './db/config';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import userRouter from "./routers/userRouter"
import productRouter from "./routers/productRouter"
import cartRouter from "./routers/cartRouter"
import verifyUser from './middleware/verifyUser';

console.log('server start running');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

app.use(cors());
connectDB();
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', verifyUser,cartRouter);
export const io = new Server(server,{ cors: { origin: "*" } });
io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});



server.listen(PORT, () => console.log(`Listening on port ${PORT},visit http://localhost:${PORT}`));