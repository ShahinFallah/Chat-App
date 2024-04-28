import { Schema, model } from 'mongoose';
import { type IMessage } from '../types'

const messageSchema = new Schema<IMessage>({

    senderId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    receiverId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    message : {
        type : String,
        required : true
    }

}, {timestamps : true});


const Message = model<IMessage>('Message', messageSchema);

export default Message;