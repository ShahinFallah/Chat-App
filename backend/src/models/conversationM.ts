import mongoose from 'mongoose';
import { ConversationDocument } from '../types/types';

const conversationSchema = new mongoose.Schema<ConversationDocument>({

    participants : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    message : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Message',
        default : []
    }]

}, {timestamps : true});


const Conversation = mongoose.model<ConversationDocument>('Conversation', conversationSchema);

export default Conversation;