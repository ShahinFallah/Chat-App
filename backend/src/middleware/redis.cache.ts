import { Response, Request, NextFunction } from 'express';

import { client } from '../config/redis';

export const checkCache = async (req : Request, res : Response, next : NextFunction) => {
    const cachedData : string = await client.get(JSON.stringify(req.user._id));

    if(cachedData) {

        return res.status(200).json(JSON.parse(cachedData));

    }else {
        
        next();
    }
}