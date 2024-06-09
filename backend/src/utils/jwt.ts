import type { Response } from 'express';
import type { TCookieOption, TInferSelectUser } from '../@types';
import jwt, { type Secret } from 'jsonwebtoken';
import { insertIntoCache } from '../db/cache';
import { cookie } from './cookie';

const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE);

export const accessTokenOption : TCookieOption = {
    expires : new Date(Date.now() + accessTokenExpire * 24 * 60 * 60 * 1000),
    maxAge : accessTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly : true,
    sameSite : 'lax'
}

export const sendToken = (user : Omit<TInferSelectUser, 'password'>, res : Response) : string => {
    const accessToken = jwt.sign({id : user.id}, process.env.ACCESS_TOKEN as Secret, {expiresIn : '15d'});
    insertIntoCache(`user:${user.id}`, user, 1209600);
    
    cookie(accessToken, accessTokenOption, res);
    return accessToken;
}