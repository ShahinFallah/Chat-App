import { Request, Response } from 'express';

import User from '../models/userModel';
import Conversation from '../models/conversationModel';
import Message from '../models/messageModel';

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

const deleteConversation = async (req : Request, res : Response) => {

    try {
        const { id: userToModify } = req.params;
        const currentUser = req.user._id;

        await Conversation.findOneAndDelete({
            participants : {$all: [currentUser, userToModify]}
        });

        await Message.deleteMany({
           $or : [{ senderId : currentUser, receiverId : userToModify}]
        });

        await User.findByIdAndUpdate({_id : currentUser}, {
            $pull : { conversations : userToModify }
        });

        res.status(200).json({message : 'deleted'});

    } catch (error) {
        
        console.log('error in deleteConversation controller :', error);
    }

}


export { searchUser, blockUser, AddConversation, getUserConversations, deleteConversation }; 