import { Router } from 'express';
import { searchUser, AddConversation, getUserConversations, deleteConversation } from '../controllers/conversation.controller';
import protectRoute from '../middleware/protectRoute';

const router = Router();

router.get('/', protectRoute, getUserConversations);

router.get('/search/:query', protectRoute, searchUser);

router.post('/add/:id', protectRoute, AddConversation);

router.delete('/delete/:id', protectRoute, deleteConversation);


export default router;