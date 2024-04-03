import Conversation from '../models/conversation.js';
import Message from '../models/message.js';

export const sendMessage = async (req, res) => {

    try {
        const { message } = req.body;
        const { id : receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants : {$all : [senderId, receiverId]}
        });

        if(!conversation) {

            conversation = await Conversation.create({
                participants : [senderId, receiverId]
            });
        }

        const newMessage = new Message({ senderId, receiverId, message });

        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);

    } catch (error) {
        
        console.log('Error in sendMessage Controller :', error.message);

        res.status(500).json({error : 'internal server error'})
    }

}

export const getMessages = async (req, res) => {

    try {
        const { id: userToChat } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants : {$all : [senderId, userToChat]}
        }).populate('messages');

        if(!conversation) return res.status(400).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);

    } catch (error) {
        
        console.log('Error in getMessages Controller :', error.message);

        res.status(500).json({error : 'internal server error'})
    }

}