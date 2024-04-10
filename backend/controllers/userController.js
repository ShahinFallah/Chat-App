import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';


const signup = async (req, res) => {

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
            password : hashedPassword,
            gender
        });

        if(user) {

            generateTokenAndSetCookie(user._id, res);
            await user.save();

            res.status(201).json({_id : user._id, fullName : user.fullName, username : user.username});

        }else {
            res.status(400).json({error : 'invalid user data'});
        }

    } catch (error) {
        
        console.log('error in signup controller', error.message);
        res.status(500).json({error : 'internal server error'});
    }

}

const login = async (req, res) => {

    try {
        const { username, password } = req.body;

        const user = await User.findOne({username});
        const isPassword = await bcrypt.compare(password, user?.password || '');

        if(!user || !isPassword) return res.status(400).json({error : 'Invalid username or password'});

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({_id : user._id, fullName : user.fullName, username : user.username});

    } catch (error) {
        
        console.log('error in login controller', error.message);
        res.status(500).json({error : 'internal server error'});
    }
    
}

const logout = async (req, res) => {

    try {
        res.cookie('jwt', '', {maxAge : 1});

        res.status(200).json({message : 'logged out successfully'});

    } catch (error) {

        console.log('error in logout controller', error.message);
        res.status(500).json({error : 'internal server error'});
    }

}

// const getLoggedInUsers = async (req, res) => {

//     try {
//         const loggedInUser = req.user._id;

//         const filteredUsers = await User.find({_id : {$ne : loggedInUser}}).select('-password');

//         res.status(200).json(filteredUsers);

//     } catch (error) {
        
//         console.log('error in getUsers controller', error.message);
//         res.status(500).json({error : 'internal server error'});
//     }

// }

const getProfile = async (req, res) => {

    try {
        const { id } = req.params;

        const user = await User.findById(id).select('-password');

        if(!user) return res.status(404).json({error : 'User not found'});

        res.status(200).json(user);

    } catch (error) {
        
        console.log('error in getProfile controller', error.message);
        res.status(500).json({error : 'internal server error'});
    }

}

const updateUser = async (req, res) => {

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

        res.status(200).json({user});

    } catch (error) {
        
        console.log('error in updateUser controller', error.message);
        res.status(500).json({error : 'internal server error'});
    }

}

const searchUser = async (req, res) => {
    try {
        const { query } = req.params;

        const users = await User.find({ username: { $regex: query, $options: 'i' } }).select('username');

        const matchingUsernames = users.map(user => [user._id, user.username]);

        res.status(200).json(matchingUsernames);

    } catch (error) {

        console.log('error in search controller', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



export { signup, login, logout, getProfile, updateUser, searchUser }