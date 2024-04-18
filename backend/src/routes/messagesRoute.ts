import express from 'express';
import protectRoute from '../middleware/protectRoute';
import { sendMessage, getMessages } from '../controllers/messageC'

const router = express.Router();

router.post('/send/:id', protectRoute, sendMessage);

router.get('/:id', protectRoute, getMessages);


export default router;