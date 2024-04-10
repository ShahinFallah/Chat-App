import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './db/connectDB.js';

import userRoute from './routes/userRoute.js';
import messageRoute from './routes/messagesRoute.js'


dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());


app.use('/api/users', userRoute);
app.use('/api/messages', messageRoute);


app.listen(PORT, () => console.log(`server is running on port ${PORT}`));