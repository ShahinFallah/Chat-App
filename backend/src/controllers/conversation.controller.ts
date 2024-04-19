import { Request, Response } from 'express';

import User from '../models/userModel';
import Conversation from '../models/conversationM';
import Message from '../models/messageModel';

export const searchUser = async (req : Request, res : Response) => {

    try {
        const { query } = req.params;

        const users = await User.find({_id : {$ne : req.user._id}, username: { $regex: query, $options: 'i' } }).select('username fullName profilePic').limit(5);

        res.status(200).json(users);

    } catch (error) {

        console.log('error in search controller', error);

        res.status(500).json({ error: 'Internal Server Error' });
    }

}

export const AddConversation = async (req : Request, res : Response) => {

    try {
        const user = await User.findById(req.params.id);

        if(!user) return res.status(400).json({error : 'User not found'});

        res.status(200).json({_id : user._id, fullName : user.fullName, username : user.username, profilePic : user.profilePic});

    } catch (error) {
        
        console.log('error in createUsersConversation controller :', error);

        res.status(500).json({error : 'Internal server error'});
    }

}

export const getUserConversations = async (req : Request, res : Response) => {
    try {
        const userId = req.user._id;

        const conversations = await Conversation.aggregate([
            { $match: { participants: userId } },
            { $lookup: {
                from: "users",
                localField: "participants",
                foreignField: "_id",
                as: "participantsInfo"
            }},
            { $unwind: "$participantsInfo" },
            { $match: { "participantsInfo._id": { $ne: userId } } },
            { $project: { 
                _id: "$participantsInfo._id",
                fullName: "$participantsInfo.fullName",
                username: "$participantsInfo.username",
                profilePic: "$participantsInfo.profilePic"
            }}
        ]);

        res.status(200).json(conversations);

    } catch (error) {

        console.log('Error in getUserConversations controller', error);

        res.status(500).json({ error: 'Internal server error' });
    }
}

export const deleteConversation = async (req : Request, res : Response) => {

    try {
        const { id: userToModify } = req.params;
        const currentUser = req.user._id;

        const conversation = await Conversation.findOneAndDelete({
            participants : {$all: [currentUser, userToModify]}
        });

        await Message.deleteMany({
           $or : [{ senderId : currentUser, receiverId : userToModify}]
        });

        await User.findByIdAndUpdate(currentUser, {$pull : {conversations : conversation._id}});
        await User.findByIdAndUpdate(userToModify, {$pull : {conversations : conversation._id}});

        res.status(200).json({message : 'deleted'});

    } catch (error) {
        
        console.log('error in deleteConversation controller :', error);

        res.status(500).json({error : 'Internal server error'});
    }

}