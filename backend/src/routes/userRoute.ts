import express from 'express';
import { getProfile, login, logout, signup, updateUser } from '../controllers/userController';
import { searchUser, blockUser, AddConversation, getUserConversations, deleteConversation } from '../controllers/conversationController'
import protectRoute from '../middleware/protectRoute';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.put('/setting/:id', protectRoute, updateUser);

router.get('/:id', protectRoute, getProfile);

router.get('/search/:query', protectRoute, searchUser);

router.post('/block/:id', protectRoute, blockUser);

router.post('/conversation/:id', protectRoute, AddConversation);

router.get('/conversations', protectRoute, getUserConversations);

router.post('/conversation/delete/:id', protectRoute, deleteConversation);


export default router;