import mongoose, { ObjectId } from 'mongoose';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user : JwtPayload
        }
    }
}

export interface IUser extends Document {
    fullName : string
    username : string
    password : string
    gender : string
    profilePic : string
    bio : string
    isFreeze : boolean
    blockedUsers : mongoose.Types.ObjectId[]
    notInConversation : mongoose.Types.ObjectId[]
    conversations : mongoose.Types.ObjectId[]
};

export interface IMessage extends Document {
    senderId : mongoose.Types.ObjectId
    receiverId : mongoose.Types.ObjectId
    message : string
};

export interface IConversation extends Document {
    participants : mongoose.Types.ObjectId[]
    message : mongoose.Types.ObjectId[]
}