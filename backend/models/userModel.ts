import { Schema, model } from 'mongoose';
import { type IUser } from '../types'

const userSchema = new Schema<IUser>({

    fullName : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minLength : 6
    },
    gender : {
        type : String,
        required : true,
        enum : ['male', 'female']
    },
    profilePic : {
        type : String,
        default : ''
    },
    bio : {
        type : String,
        default : ''
    },
    isFreeze : {
        type : Boolean,
        default : false
    },
    blockedUsers : [{
        type : Schema.Types.ObjectId,
        ref : 'User',
        default : []
    }]

}, {timestamps : true});


const User = model<IUser>('User', userSchema);

export default User;