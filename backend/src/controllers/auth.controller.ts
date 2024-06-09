import type { Request, Response, NextFunction } from 'express';
import { CatchAsyncError } from '../middlewares/catchAsyncError';
import { loginRegister, logoutService, refreshAccessTokenService, registerService } from '../services/auth.service';
import { sendToken } from '../utils/jwt';
import { cookie } from '../utils/cookie';
import type { TCookieOption, TInferSelectUser } from '../@types';

export const register = CatchAsyncError(async (req : Request, res : Response, next : NextFunction) : Promise<void> => {

    try {
        const user : Omit<TInferSelectUser, 'password'> = await registerService(req.body);
        res.status(200).json({success : true, user});
        
    } catch (error) {
        return next(error);
    }
});

export const login = CatchAsyncError(async (req : Request, res : Response, next : NextFunction) : Promise<void> => {

    try {
        const user : Omit<TInferSelectUser, 'password'> = await loginRegister(req.body);
        req.user = user;
        const accessToken = sendToken(user, res);
        res.status(200).json({success : true, user, accessToken});
        
    } catch (error) {
        return next(error);
    }
});

export const logout = CatchAsyncError(async (req : Request, res : Response, next : NextFunction) : Promise<void> => {

    try {
        cookie('', {maxAge : 1} as TCookieOption, res);
        logoutService(req.user!.id);
        res.status(200).json({success : true, message : 'Logged out successfully'});
        
    } catch (error) {
        return next(error);
    }
});

export const refreshAccessToken = CatchAsyncError(async (req : Request, res : Response, next : NextFunction) : Promise<void> => {

    try {
        const accessToken : string = req.cookies.access_token;
        const user : Omit<TInferSelectUser, 'password'> = await refreshAccessTokenService(accessToken);
        const access_token : string = sendToken(user, res);
        
        res.status(200).json({success : true, access_token});
        
    } catch (error) {
        return next(error);
    }
});