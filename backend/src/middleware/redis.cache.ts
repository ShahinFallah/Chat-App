import { Response, Request, NextFunction } from 'express';

import { client } from '../config/redis.js';

export const checkCache = async (req : Request, res : Response, next : NextFunction) => {
    const cachedData : string = await client.get(req.params.id);

    if(cachedData) {

        return res.status(200).json(JSON.parse(cachedData));

    }else {
        
        next();
    }
}

export const checkCacheCookie = async (req : Request, res : Response, next : NextFunction) => {
    const cachedData : string = await client.get(JSON.stringify(req.user._id));

    if(cachedData) {

        return res.status(200).json(JSON.parse(cachedData));

    }else {
        
        next();
    }
}

export const searchCache = async (req : Request, res : Response, next : NextFunction) => {
    const cachedData : string = await client.get(req.params.query);

    if(cachedData) {

        return res.status(200).json(JSON.parse(cachedData));

    }else {
        
        next();
    }
}