import type { Request, Response, NextFunction } from 'express';
import { CatchAsyncError } from '../middlewares/catchAsyncError';
import { newConversationService, searchUserService } from '../services/conversation.service';
import type { TInferSelectUser } from '../@types';

export const searchUser = CatchAsyncError(async (req : Request, res : Response, next : NextFunction) => {

    try {
        const { query } = req.params as {query : string};
        const currentUserId : string = req.user!.id;
        const searchResult : Omit<TInferSelectUser, 'password'>[] = await searchUserService(query, currentUserId);

        res.status(200).json({success : true, users : searchResult});

    } catch (error) {
        return next(error);
    }
});

export const newConversation = CatchAsyncError(async (req : Request, res : Response, next : NextFunction) => {

    try {
        const { id : userId } = req.params as {id : string};
        const user : Omit<TInferSelectUser, 'password'> = await newConversationService(userId);

        res.status(200).json({success : true, user});
        
    } catch (error) {
        return next(error);
    }
});