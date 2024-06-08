import { Router } from 'express';
import { blockUser, getProfile, updateUser } from '../controllers/user.controller';
import protectRoute from '../middleware/protectRoute';

const router = Router();

router.get('/:id', protectRoute, getProfile);

router.put('/update/:id', protectRoute, updateUser);

router.post('/block/:id', protectRoute, blockUser);


export default router;