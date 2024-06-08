import type { Document, ObjectId } from 'mongoose';
import { type JwtPayload } from 'jsonwebtoken';

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
    profilePic? : string
    bio? : string
    isFreeze? : boolean
    blockedUsers? : ObjectId[]
};

export interface IMessage extends Document {
    senderId : ObjectId
    receiverId : ObjectId
    message : string
};

export interface IConversationParticipant extends IUser {
    fullName : string
    username : string
    profilePic : string
}

export interface IConversationDocument extends IConversationParticipant {
    participants: ConversationParticipant[];
    message : {
        message : string
        senderId? : ObjectId
        receiverId? : ObjectId
    }[]
}