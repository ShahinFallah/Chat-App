import Conversation from '../models/conversationModel.js';
import Message from '../models/messageModel.js';


const sendMessage = async (req, res) => {

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

        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);

    } catch (error) {
        
        console.log(`error in sendMessage controller :`, error.message);
        res.status(500).json({error : 'Internal server error'});
    }

}

const getMessages = async (req, res) => {

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

        console.log('Error in getMessages Controller :', error.message);
        res.status(500).json({error : 'internal server error'});
    }

}


export { sendMessage, getMessages }