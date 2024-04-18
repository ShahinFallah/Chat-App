import Conversation from '../models/conversationM';
import Message from '../models/messageModel';
import { Request, Response } from 'express';
import User from '../models/userModel';
import { getReceiverSocketId, io } from "../socket/socket";

const sendMessage = async (req : Request, res : Response) => {

    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants : {$all : [senderId, receiverId]}
        });

        if(!conversation) {

            conversation = await Conversation.create({
                participants : [senderId, receiverId]
            });
        }

        const newMessage = new Message({senderId, receiverId, message});
        
        if(newMessage) {
            conversation.message.push(newMessage._id);
        }
        
        await User.findByIdAndUpdate(receiverId, {
            $push : {conversations : conversation._id}
        })

        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
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
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
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