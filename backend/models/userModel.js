import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

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
    // isBlock : {
    //     type : Boolean,
    //     default : false
    // },
    blockedUsers : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        default : []
    }],
    conversations : [{
        type : mongoose.Schema.Types.ObjectId,
        default : []
    }]

}, {timestamps : true});


const User = mongoose.model('User', userSchema);

export default User;