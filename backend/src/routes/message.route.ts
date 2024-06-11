import { Router } from 'express';
import { isAuthenticated } from '../middlewares/auth';
import { getMessages, sendMessage } from '../controllers/message.controller';
import validationMiddleware from '../middlewares/validation.middleware';
import { newMessageSchema } from '../validations/Joi';

const router = Router();

router.post('/new/:id', [isAuthenticated, validationMiddleware(newMessageSchema)], sendMessage);

router.get('/:id', isAuthenticated, getMessages);

export default router;