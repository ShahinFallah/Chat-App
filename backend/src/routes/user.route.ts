import { Router } from 'express';
import { blockUser, getProfile, updateUser } from '../controllers/user.controller';
import protectRoute from '../middleware/protectRoute';
import { checkCache, checkCacheCookie } from '../middleware/redis.cache';

const router = Router();

router.get('/:id', [protectRoute, checkCacheCookie], getProfile);

router.put('/update/:id', protectRoute, updateUser);

router.post('/block/:id', protectRoute, blockUser);


export default router;