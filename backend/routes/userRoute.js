import express from 'express';
import { AddConversation, blockUser, getProfile, getUserConversations, login, logout, searchUser, signup, updateUser } from '../controllers/userController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.get('/conversations', protectRoute, getUserConversations);

router.get('/:id', protectRoute, getProfile);

router.put('/setting/:id', protectRoute, updateUser);

router.get('/search/:query', searchUser);

router.post('/block/:id', protectRoute, blockUser);

router.post('/conversation/:id', protectRoute, AddConversation);


export default router;