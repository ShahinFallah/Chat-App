import User from '../models/userModel';
import Conversation from '../models/conversationModel';
// import Message from '../models/messageModel.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken';
import { Request, Response } from 'express';


const signup = async (req : Request, res : Response) => {

    try {
        const { fullName, username, confirmPassword, password, gender } = req.body;

        if(password !== confirmPassword) return res.status(400).json({error : 'Password dose not match'});

        const isUserExists = await User.findOne({username});

        if(isUserExists) return res.status(400).json({error : 'Username already exists'});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({

            fullName,
            username,
            password : hashedPassword,
            gender
        });

        if(user) {

            generateTokenAndSetCookie(user._id.toString(), res);
            await user.save();

            res.status(201).json({_id : user._id, fullName : user.fullName, username : user.username});

        }else {
            res.status(400).json({error : 'invalid user data'});
        }

    } catch (error) {
        
        console.log('error in signup controller', error);
        res.status(500).json({error : 'internal server error'});
    }

}

const login = async (req : Request, res : Response) => {

    try {
        const { username, password } = req.body;

        const user = await User.findOne({username});
        const isPassword = await bcrypt.compare(password, user?.password || '');

        if(!user || !isPassword) return res.status(400).json({error : 'Invalid username or password'});

        generateTokenAndSetCookie(user._id.toString(), res);

        res.status(200).json({_id : user._id, fullName : user.fullName, username : user.username});

    } catch (error) {
        
        console.log('error in login controller', error);
        res.status(500).json({error : 'internal server error'});
    }
    
}

const logout = async (req : Request, res : Response) => {

    try {
        res.cookie('jwt', '', {maxAge : 1});

        res.status(200).json({message : 'logged out successfully'});

    } catch (error) {

        console.log('error in logout controller', error);
        res.status(500).json({error : 'internal server error'});
    }

}

const getUserConversations = async (req : Request, res : Response) => {
    try {
        const loggedInUserId = req.user._id;

        const users = await User.aggregate([
            
            { $match: { _id: loggedInUserId } },
            { $unwind: "$conversations" },
            { $lookup: {
                from: "users",
                localField: "conversations",
                foreignField: "_id",
                as: "conversationUsers"
            }},
            { $unwind: "$conversationUsers" },
            { $project: { 
                _id: "$conversationUsers._id",
                fullName: "$conversationUsers.fullName",
                username: "$conversationUsers.username",
                profilePic: "$conversationUsers.profilePic",
                bio: "$conversationUsers.bio"
            }}
        ]);

        res.status(200).json(users);

    } catch (error) {
        
        console.log('Error in getUserConversations controller', error);

        res.status(500).json({ error: 'Internal server error' });
    }
}



const getProfile = async (req : Request, res : Response) => {

    try {
        const { id } = req.params;

        const user = await User.findById(id).select('-password');

        if(!user) return res.status(404).json({error : 'User not found'});

        res.status(200).json(user);

    } catch (error) {
        
        console.log('error in getProfile controller', error);
        res.status(500).json({error : 'internal server error'});
    }

}

const updateUser = async (req : Request, res : Response) => {

    try {
        const { fullName, username, password, gender, bio } = req.body;
        const { profilePic } = req.body;

        const userId = req.user._id;

        let user = await User.findById(userId);

        if(!user) return res.status(404).json({error : 'User not found'});

        if(req.params.id !== userId.toString()) return res.status(400).json({error : 'You cannot change other users profile'});

        if(password) {

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user.password = hashedPassword;
        }

        // profile api

        user.fullName = fullName || user.fullName;
        user.username = username || user.username;
        user.gender = gender || user.gender;
        user.bio = bio || user.bio;

        await user.save();

        res.status(200).json({user});

    } catch (error) {
        
        console.log('error in updateUser controller', error);
        res.status(500).json({error : 'internal server error'});
    }

}

const searchUser = async (req : Request, res : Response) => {

    try {
        const { query } = req.params;

        const users = await User.find({_id : {$ne : req.user._id}, username: { $regex: query, $options: 'i' } }).select('username');

        // const matchingUsernames = users.map(user => [user._id, user.username]);

        res.status(200).json(users);

    } catch (error) {

        console.log('error in search controller', error);

        res.status(500).json({ error: 'Internal Server Error' });
    }

}

const blockUser = async (req : Request, res : Response) => {

    try {
        const { id } = req.params;

        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if(id === req.user._id.toString()) return res.status(400).json({error : 'You cannot block or unBlock yourself'});

        const isBlock = currentUser.blockedUsers.includes(userToModify._id);

        if(isBlock) {

            await User.findByIdAndUpdate(req.user._id, {$pull : {blockedUsers : userToModify._id}});

            res.status(200).json({status : true, message : 'User has been unBlocked'});
        }else {

            await User.findByIdAndUpdate(req.user._id, {$push : {blockedUsers : userToModify._id}});

            res.status(200).json({status : true, message : 'User has been blocked'});
        }

    } catch (error) {
        
        console.log('error in block controller', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

const AddConversation = async (req : Request, res : Response) => {

    try {
        const userToModify = await User.findById(req.params.id).select('-password');
        const currentUser = await User.findById(req.user._id);
        // const conversationMessages = await Message.findOne({

        //     senderId : currentUser,
        //     receiverId : userToModify
            
        // }).sort({createdAt : -1}).limit(1);
        
        if(userToModify._id.toString() === currentUser._id.toString()) return res.status(400).json({error : 'you cannot start conversation with yourself'});

        const isHaveConversation = currentUser.conversations.includes(userToModify._id);

        if(!isHaveConversation) {

            await User.findByIdAndUpdate(req.user._id, {$push : {conversations : userToModify._id}});

            let conversation = await Conversation.findOne({
                participants : {$all : [currentUser, userToModify]}
            });

            if(!conversation) {

                conversation = await Conversation.create({
                    participants : [currentUser, userToModify]
                });
            }

            res.status(200).json({_id : userToModify._id, fullName : userToModify.fullName, username : userToModify.username, profilePic : userToModify.profilePic});
        }

    } catch (error) {
        
        console.log('error in createUsersConversation controller :', error);

        res.status(500).json({error : 'Internal server error'});
    }

}


export { signup, login, logout, getProfile, updateUser, searchUser, blockUser, AddConversation, getUserConversations }
