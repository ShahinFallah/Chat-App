import express from 'express';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import compression from 'compression'

import { app, server } from './socket/socket';

import connectDB from './db/connectDB';
// import connectRedis from './db/redis.connect';

import authRoute from './routes/auth.route';
import userRoute from './routes/user.route';
import conversation from './routes/conversation.route';
import messagesRoute from './routes/message.route';

const PORT = process.env.PORT || 5000;
connectDB();
// connectRedis();

app.use(compression());
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/conversation', conversation);
app.use('/api/messages', messagesRoute);


server.listen(PORT, () => console.log(`server is running on port ${PORT}`));

export default app;