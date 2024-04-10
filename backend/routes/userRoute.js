import express from 'express';
import { getProfile, login, logout, searchUser, signup, updateUser } from '../controllers/userController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

// router.get('/', protectRoute, getLoggedInUsers);

router.get('/:id', protectRoute, getProfile);

router.put('/setting/:id', protectRoute, updateUser);

router.post('/search/:query', searchUser);


export default router;