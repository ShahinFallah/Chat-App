import { Router } from 'express';
import { searchUser, AddConversation, getUserConversations, deleteConversation } from '../controllers/conversation.controller';
import protectRoute from '../middleware/protectRoute';
import { checkCache, searchCache } from '../middleware/redis.cache';

const router = Router();

router.get('/:id', [protectRoute, checkCache], getUserConversations);

router.get('/search/:query', [protectRoute, searchCache], searchUser);

router.get('/add/:id', protectRoute, AddConversation);

router.delete('/delete/:id', protectRoute, deleteConversation);


export default router;