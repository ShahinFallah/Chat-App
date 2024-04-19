import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/userModel';
import { Response, Request, NextFunction } from 'express';

const protectRoute = async (req : Request, res : Response, next : NextFunction) => {

    try {
        const token = req.cookies.jwt;

        if(!token) return res.status(401).json({error : 'Unauthorized - No Token Provided'});

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

        if(!decoded) return res.status(401).json({error : 'Token is not valid'});

        const user = await User.findById(decoded.userId).select('-password');

        if(!user) return res.status(400).json({error : 'User not found'});

        req.user = user;
        
        next();

    } catch (error) {
        
        console.log('Error is protectRoute Middleware : ', error);

        res.status(500).json({error : 'Internal server error'});
    }

}

export default protectRoute;