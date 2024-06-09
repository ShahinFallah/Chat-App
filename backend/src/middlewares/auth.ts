import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { CatchAsyncError } from './catchAsyncError';
import ErrorHandler from '../utils/errorHandler';
import { AccessTokenInvalidError, LoginRequiredError } from '../utils/customErrors';
import type { TInferSelectUser } from '../@types';
import { findInCache } from '../db/cache';

export const isAuthenticated = CatchAsyncError(async (req : Request, res : Response, next : NextFunction) : Promise<void> => {

    try {
        const accessToken : string = req.cookies.access_token;
        if(!accessToken) return next(new LoginRequiredError());

        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN) as JwtPayload & TInferSelectUser;
        if(!decoded) return next(new AccessTokenInvalidError());

        const user : Omit<TInferSelectUser, 'password'> = await findInCache(`user:${decoded.id}`);
        if(Object.keys(user).length <= 0) return next(new LoginRequiredError());
        req.user = user;
        next();
        
    } catch (error : any) {
        return next(new ErrorHandler(`An error occurred : ${error.message}`, error.statusCode));
    }
});