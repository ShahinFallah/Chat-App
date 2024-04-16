import express from 'express';
import { getProfile, login, logout, signup, updateUser } from '../controllers/userController';
import { searchUser, blockUser, AddConversation, getUserConversations, deleteConversation } from '../controllers/conversationController'
import protectRoute from '../middleware/protectRoute';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.get('/conversations', protectRoute, getUserConversations);

router.get('/:id', protectRoute, getProfile);

router.put('/setting/:id', protectRoute, updateUser);

router.get('/search/:query', protectRoute, searchUser);

router.post('/block/:id', protectRoute, blockUser);

router.post('/conversation/:id', protectRoute, AddConversation);

router.delete('/conversations/delete/:id', protectRoute, deleteConversation);


export default router;