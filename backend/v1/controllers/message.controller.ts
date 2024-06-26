import { type Request, type Response } from 'express';
import { getReceiverSocketId, io } from '../socket/socket';

import Message from '../models/message.model';
import Conversation from '../models/conversation.model';
import type { IConversationParticipant, IConversationDocument, IMessage } from '../types';


const sendMessage = async (req : Request, res : Response) => {

    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId : string = req.user._id;

        let conversation : IConversationDocument | null = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if(!conversation) {
            conversation = await Conversation.create({
                participants : [senderId, receiverId]
            });

            await conversation.save();

            const conversations : IConversationDocument | null = await Conversation.findOne({

                participants: { $all: [senderId, receiverId] }

            }).populate('participants', 'username profilePic fullName').select('participants');
            
            if (conversations) {
                conversations.participants = conversations.participants.filter((participant : IConversationParticipant) => participant._id.toString() !== receiverId.toString());
            
                const receiverSocketId : string = getReceiverSocketId(receiverId);

                if (receiverSocketId) {
                    io.to(receiverSocketId).emit('newConversation', conversations.participants);
                }
            }
        }

        const newMessage : IMessage = new Message({
            senderId,
            receiverId,
            message
        });

        conversation.message.push(newMessage._id);

        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId : string = getReceiverSocketId(receiverId);
		if (receiverSocketId) {

			io.to(receiverSocketId).emit('newMessage', newMessage);
		}

        res.status(201).json(newMessage);

    } catch (error) {
        
        console.log(`error in sendMessage controller :`, error);
        
        res.status(500).json({error : 'Internal server error'});
    }

}

const getMessages = async (req : Request, res : Response) => {

    try {
        const { id: userToChat } = req.params;
        const senderId : string = req.user._id;

        const conversation : IConversationDocument | null = await Conversation.findOne({
            participants : {$all : [senderId, userToChat]}
        }).populate('message');

        if(!conversation) return res.status(400).json([]);

        const message = conversation.message;

        res.status(200).json(message);

    } catch (error) {

        console.log('Error in getMessages Controller :', error);

        res.status(500).json({error : 'internal server error'});
    }

}


export { sendMessage, getMessages }