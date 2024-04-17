import { Request, Response } from 'express';

import User from '../models/userModel';
import Conversation from '../models/conversationModel';
import Message from '../models/messageModel';

const searchUser = async (req : Request, res : Response) => {

    try {
        const { query } = req.params;

        const users = await User.find({_id : {$ne : req.user._id}, username: { $regex: query, $options: 'i' } }).select('username fullName profilePic');

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

            let conversation = await Conversation.findOne({
                participants : {$all : [currentUser._id, userToModify._id]}
            });

            if(!conversation) {

                conversation = await Conversation.create({
                    participants : [currentUser._id, userToModify._id]
                });
            }

            await User.findByIdAndUpdate(req.user._id, {$push : {conversations : conversation._id}});

            res.status(200).json({_id : userToModify._id, fullName : userToModify.fullName, username : userToModify.username, profilePic : userToModify.profilePic});
        }

    } catch (error) {
        
        console.log('error in createUsersConversation controller :', error);

        res.status(500).json({error : 'Internal server error'});
    }

}

const getUserConversations = async (req : Request, res : Response) => {
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

const deleteConversation = async (req : Request, res : Response) => {

    try {
        const { id: userToModify } = req.params;
        const currentUser = req.user._id;

        // await Conversation.findOneAndDelete({
        //     participants : {$all: [currentUser, userToModify]}
        // });

        // await Message.deleteMany({
        //    $or : [{ senderId : currentUser, receiverId : userToModify}]
        // });

        // await User.findByIdAndUpdate({_id : currentUser}, {
        //     $pull : { conversations : userToModify }
        // });

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
    }

}


export { searchUser, blockUser, AddConversation, getUserConversations, deleteConversation }; 