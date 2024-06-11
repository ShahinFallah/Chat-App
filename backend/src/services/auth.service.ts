import type { TInferSelectUser } from '../@types';
import { deleteFromCache, findInCache } from '../db/cache';
import { findFirstUser, insertUser } from '../db/query/user.query';
import { InvalidUsernameOrPasswordError, LoginRequiredError, PasswordDoesNotMatch, TokenRefreshError, UsernameExistsError } from '../utils/customErrors';
import ErrorHandler from '../utils/errorHandler';
import { comparePassword, hashPassword } from '../utils/hashPassword';
import jwt, { type JwtPayload, type Secret } from 'jsonwebtoken';


export const registerService = async (body : TInferSelectUser) => {
    try {
        const { fullName, username, password, confirmPassword } = body as TInferSelectUser & {confirmPassword : string};
        const isUsernameExists : TInferSelectUser = await findFirstUser(undefined, username);
        if(isUsernameExists) throw new UsernameExistsError();

        if(password !== confirmPassword) throw new PasswordDoesNotMatch();
        const hashedPassword : string = await hashPassword(password);

        const user = {fullName, username, password : hashedPassword} as TInferSelectUser;
        const userRaw : Omit<TInferSelectUser, 'password'> = await insertUser(user);
        return userRaw;
        
    } catch (error : any) {
        throw new ErrorHandler(`An error occurred : ${error.message}`, error.statusCode);
    }
};

export const loginRegister = async (body : TInferSelectUser) => {
    try {
        const { username, password : pass } = body as TInferSelectUser;
        const user : TInferSelectUser = await findFirstUser(undefined, username);
        const isPasswordMatch : boolean = await comparePassword(pass, user.password);

        if(!user || !isPasswordMatch) throw new InvalidUsernameOrPasswordError();
        const {password, ...others} = user;
        return others;
        
    } catch (error : any) {
        throw new ErrorHandler(`An error occurred : ${error.message}`, error.statusCode);
    }
}

export const logoutService = async (userId : string) => {
    try {
        await deleteFromCache(`user:${userId}`);
        
    } catch (error : any) {
        throw new ErrorHandler(`An error occurred : ${error.message}`, error.message);
    }
}

export const refreshAccessTokenService = async (accessToken : string) : Promise<Omit<TInferSelectUser, 'password'>> => {
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN as Secret) as JwtPayload & TInferSelectUser;
        if(!decoded) throw new TokenRefreshError();

        const session : Omit<TInferSelectUser, 'password'> = await findInCache(`user:${decoded.id}`);
        if(!session) throw new LoginRequiredError();

        return session;

    } catch (error : any) {
        throw new ErrorHandler(`An error occurred : ${error.message}`, error.message);
    }
}