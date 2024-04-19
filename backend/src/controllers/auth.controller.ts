import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken';
import { Request, Response } from 'express';

import User from '../models/userModel';

export const signup = async (req : Request, res : Response) => {

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
            gender,
            password : hashedPassword
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

export const login = async (req : Request, res : Response) => {

    try {
        const { username, password } = req.body;

        const user = await User.findOne({username});
        const isPassword = await bcrypt.compare(password, user?.password || '');

        if(!user || !isPassword) return res.status(400).json({error : 'Invalid username or password'});

        if(user.isFreeze == true) user.isFreeze = false;

        generateTokenAndSetCookie(user._id.toString(), res);

        res.status(200).json({_id : user._id, fullName : user.fullName, username : user.username});

    } catch (error) {
        
        console.log('error in login controller', error);

        res.status(500).json({error : 'internal server error'});
    }
    
}

export const logout = async (req : Request, res : Response) => {

    try {
        res.cookie('jwt', '', {maxAge : 1});

        res.status(200).json({message : 'logged out successfully'});

    } catch (error) {

        console.log('error in logout controller', error);

        res.status(500).json({error : 'internal server error'});
    }

}

export const freezeAccount = async (req : Request, res : Response) => {

    try {
        res.cookie('jwt', '', {maxAge : 1});

        const freeze = await User.findByIdAndUpdate(req.user._id, {isFreeze : true});

        await freeze.save();

        res.status(200).json({message : 'Account has been freezed'});

    } catch (error) {
        
        console.log('error in freezeAccount controller', error);
        
        res.status(500).json({error : 'internal server error'});
    }

}