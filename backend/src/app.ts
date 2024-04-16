import express, { Express } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import compression from 'compression'

import connectDB from './db/connectDB';
import userRoute from './routes/userRoute';
import messageRoute from './routes/messagesRoute'


dotenv.config();
connectDB();

const app : Express = express();

const PORT = process.env.PORT || 5000;

app.use(compression());
app.use(express.json());
app.use(cookieParser());


app.use('/api/users', userRoute);
app.use('/api/messages', messageRoute);


app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

export default app;