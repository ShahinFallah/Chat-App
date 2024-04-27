import { Document, type ObjectId } from 'mongoose';
import { type JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user : JwtPayload
        }
    }
}

export interface IUser extends Document {
    fullName? : string
    username? : string
    password? : string
    gender? : string
    profilePic? : string
    bio? : string
    isFreeze? : boolean
    blockedUsers? : ObjectId[]
    notInConversation? : ObjectId[]
    conversations? : ObjectId[]
};

export interface IMessage extends Document {
    senderId : ObjectId
    receiverId : ObjectId
    message : string
};

export interface ConversationParticipant extends IUser {
    fullName? : string
    username? : string
    password? : string
    gender? : string
    profilePic? : string
    bio? : string
    isFreeze? : boolean
    blockedUsers? : ObjectId[]
    notInConversation? : ObjectId[]
    conversations? : ObjectId[]
}

export interface ConversationDocument extends Document {
    participants: ConversationParticipant[];
    message : ObjectId[]
}