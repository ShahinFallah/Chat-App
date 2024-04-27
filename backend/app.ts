import express from 'express';
import cookieParser from 'cookie-parser';

import { app, server } from './socket/socket';

import connectDB from './db/connectDB';

import authRoute from './routes/auth.route';
import userRoute from './routes/user.route';
import conversation from './routes/conversation.route';
import messagesRoute from './routes/message.route';
import faker from './utils/faker';


const PORT = process.env.PORT || 5500;
connectDB();


app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/conversation', conversation);
app.use('/api/messages', messagesRoute);
app.use('/faker', faker) // add fake user


server.listen(PORT, () : void => console.log(`server is running on port ${PORT}`));

export default app;