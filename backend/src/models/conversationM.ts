import mongoose from 'mongoose';
import { IConversation } from '../types/types';

const conversationSchema = new mongoose.Schema({

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


const Conversation = mongoose.model<IConversation>('Conversation', conversationSchema);

export default Conversation;