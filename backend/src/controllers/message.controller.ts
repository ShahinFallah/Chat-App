import type { NextFunction, Request, Response } from 'express';
import { CatchAsyncError } from '../middlewares/catchAsyncError';
import { getMessagesService, sendMessageService } from '../services/message.service';
import type { TInferSelectMessage } from '../@types';


export const sendMessage = CatchAsyncError(async (req : Request, res : Response, next : NextFunction) => {

    try {
        const { message } = req.body as {message : string}
        const senderId : string = req.user!.id;
        const { id : receiverId } = req.params as {id : string};
        
        const newMessage : TInferSelectMessage = await sendMessageService(message, senderId, receiverId);
        res.status(200).json({success : true, newMessage});

    } catch (error) {
        return next(error);
    }
});

export const getMessages = CatchAsyncError(async (req : Request, res : Response, next : NextFunction) => {

    try {
        const { id : receiverId } = req.params as {id : string};
        const currentUser : string = req.user!.id;

        const messages : TInferSelectMessage[] = await getMessagesService(currentUser, receiverId);
        res.status(200).json({success : true, messages});
        
    } catch (error) {
        return next(error);
    }
});