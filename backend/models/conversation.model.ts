import { Schema, model } from 'mongoose';
import { type ConversationDocument } from '../types';

const conversationSchema = new Schema<ConversationDocument>({

    participants : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],
    message : [{
        type : Schema.Types.ObjectId,
        ref : 'Message',
        default : []
    }]

}, {timestamps : true});


const Conversation = model<ConversationDocument>('Conversation', conversationSchema);

export default Conversation;