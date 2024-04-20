import express from 'express';
import protectRoute from '../middleware/protectRoute';
import { sendMessage, getMessages } from '../controllers/message.controller';
import { checkCache } from '../middleware/redis.cache';

const router = express.Router();

router.post('/send/:id', protectRoute, sendMessage);

router.get('/:id', [protectRoute, checkCache], getMessages);


export default router;