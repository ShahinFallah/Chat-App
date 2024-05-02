import { Schema, model } from 'mongoose';
import { type IConversationDocument } from '../types';

const conversationSchema = new Schema({

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


const Conversation = model<IConversationDocument>('Conversation', conversationSchema);

export default Conversation;