import express from 'express';
import dotenv from 'dotenv';
import CookieParser from 'cookie-parser';
// import cors from 'cors';

import authRouter from './routes/auth.js';
import messageRouter from './routes/message.js';
import userRouter from './routes/user.js';

import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server } from './socket/socket.js';


dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads
app.use(CookieParser());
// app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);
app.use('/api/users', userRouter);


server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`server is running on port ${PORT}`);
});