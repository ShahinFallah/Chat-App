import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { client } from '../config/redis.js';

import User from '../models/userModel';


export const getProfile = async (req : Request, res : Response) => {

    try {
        const { id } = req.params;
        
        const user = await User.findById(id).select('-password');

        if(user.isFreeze == true) return res.status(400).json({message : 'This Account is freezed'});
    
        if(!user) return res.status(404).json({error : 'User not found'});
            
        res.status(200).json(user);

    } catch (error) {
        
        console.log('error in getProfile controller', error);
        
        res.status(500).json({error : 'internal server error'});
    }

}

export const updateUser = async (req : Request, res : Response) => {

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

        await client.setex(JSON.stringify(user._id), 240, JSON.stringify(user));

        res.status(200).json({user});

    } catch (error) {
        
        console.log('error in updateUser controller', error);

        res.status(500).json({error : 'internal server error'});
    }

}

export const blockUser = async (req : Request, res : Response) => {

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