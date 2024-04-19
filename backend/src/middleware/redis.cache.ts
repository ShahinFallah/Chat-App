// import { Response, Request, NextFunction } from 'express';

// import { client } from '../config/redis';

// export const checkCache = async (req : Request, res : Response, next : NextFunction) => {
//     const cachedData : string = await client.get(req.params.id);
  
//     if (cachedData) {
//       res.json(cachedData);
//     } else {
//       next();
//     }
//   };