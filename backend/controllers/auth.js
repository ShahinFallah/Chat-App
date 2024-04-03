import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req, res) => {

    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if(password !== confirmPassword) {

            return res.status(400).json({error : 'Password does not match'})
        }

        const isUsernameExists = await User.findOne({username});
        if(isUsernameExists) {

            return res.status(400).json({error : 'Username already exists'});
        }

        // hash password

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        // https://avatar-placeholder.iran.liara.run/

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const user = new User({

            fullName,
            username,
            password : hashedPass,
            gender,
            profilePic : gender === 'male' ? boyProfilePic : girlProfilePic
        });

        generateTokenAndSetCookie(user._id, res);

        await user.save();

        res.status(201).json({_id : user._id, fullName : user.fullName, username : user.username, profilePic : user.profilePic});

    } catch (error) {
        
        console.log('Error in signup controller', error.message);

        res.status(500).json({error : 'Internal server error'});
    }

}

export const login = async (req, res) => {

    try {
        const { username, password } = req.body;

        const user = await User.findOne({username});

        const isPassword = await bcrypt.compare(password, user?.password || '');

        if(!user || !isPassword) {

            return res.status(400).json({error : 'Invalid username or password'});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({_id : user._id, fullName : user.fullName, username : user.username, profilePic : user.profilePic})

    } catch (error) {
        
        console.log('Error in Login controller', error.message);

        res.status(500).json({error : 'Internal server error'});
    }

}

export const logout = (req, res) => {

    try {
        res.cookie('jwt', '', {maxAge : 0});

        res.status(200).json({message : 'Logged out successfully'});

    } catch (error) {
        
        console.log('Error in Logout controller', error.message);

        res.status(500).json({error : 'Internal server error'});
    }

}