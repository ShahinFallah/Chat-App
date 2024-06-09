import express, { type NextFunction, type Request, type Response, type Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ErrorMiddleware } from './middlewares/error';

import authRouter from './routes/auth.route';
import conversationRouter from './routes/conversation.route';
import { RouteNowFoundError } from './utils/customErrors';

export const app : Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin : process.env.ORIGIN}));

app.get('/', (req : Request, res : Response) => res.status(200).json({success : true, message : 'Welcome'}));

app.use('/api/v3/auth', authRouter);
app.use('/api/v3/conversation', conversationRouter);

app.all('*', (req : Request, res : Response, next : NextFunction) => {
    const error = new RouteNowFoundError(`Route : ${req.originalUrl} not found`);
    next(error);
});

app.use(ErrorMiddleware);