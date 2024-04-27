import { type Request, type Response } from 'express';
import { getReceiverSocketId, io } from '../socket/socket';

import User from '../models/userModel';
import Conversation from '../models/conversationM';
import Message from '../models/messageModel';
import { type ConversationDocument, type ConversationParticipant } from '../types/types';


export const searchUser = async (req : Request, res : Response) => {

    try {
        const { query } = req.params;

        const users = await User.find({_id : {$ne : req.user._id}, username: { $regex: query} }).select('username fullName profilePic').limit(5);

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
        const userId : string = req.user._id;

        const conversations = await Conversation.find({
            participants : userId
        }).populate('participants', 'username fullName profilePic');

        const mappedConversations = conversations.map((conversations : ConversationDocument) => {

            const participants = conversations.participants.find((participants : ConversationParticipant) => participants._id.toString() != userId);

            return {
                _id : participants._id,
                fullName : participants.fullName,
                username : participants.username,
                profilePic : participants.profilePic
            }
        });

        res.status(200).json(mappedConversations);

    } catch (error) {

        console.log('Error in getUserConversations controller', error);

        res.status(500).json({ error: 'Internal server error' });
    }
}

export const deleteConversation = async (req : Request, res : Response) => {

    try {
        const { id: userToModify } = req.params;
        const currentUser : string = req.user._id;

        const conversation = await Conversation.findOneAndDelete({
            participants : {$all: [currentUser, userToModify]}
        });

        await Message.deleteMany({
           $or : [{ senderId : currentUser, receiverId : userToModify}]
        });

        const conversations = await Conversation.find({
            participants: userToModify,
            _id: { $ne: conversation._id }

        }).populate('participants', 'profilePic username fullName').select('participants -_id');
        
        const mappedConversations = conversations.map((conversation: ConversationDocument) => {

            const participant = conversation.participants.find((participant: ConversationParticipant) => participant._id.toString() != userToModify);

            return {
                _id: participant._id,
                username: participant.username,
                fullName: participant.fullName,
                profilePic: participant.profilePic
            };
        });

        const receiverSocketId = getReceiverSocketId(userToModify);
        if(receiverSocketId) {

            io.to(receiverSocketId).emit('deleted', {
                conversations : mappedConversations,
                deletedId : currentUser
            });
        }

        res.status(200).json({message : 'deleted'});

    } catch (error) {
        
        console.log('error in deleteConversation controller :', error);

        res.status(500).json({error : 'Internal server error'});
    }

}