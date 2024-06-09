import express, { type NextFunction, type Request, type Response, type Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { ErrorMiddleware } from './middlewares/error';

import authRouter from './routes/auth.route';

export const app : Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin : process.env.ORIGIN}));

app.get('/', (req : Request, res : Response) => res.status(200).json({success : true, message : 'Welcome'}));

app.use('/api/v3/auth', authRouter);

app.all('*', (req : Request, res : Response, next : NextFunction) => {
    const error = new Error(`Route : ${req.originalUrl} not found`);
    next(error);
});

app.use(ErrorMiddleware);