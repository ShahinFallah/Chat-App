import { Router, type NextFunction, type Request, type Response } from 'express';
import { login, logout, refreshAccessToken, register } from '../controllers/auth.controller';
import { BadRequestError, RouteNowFoundError } from '../utils/customErrors';
import validationMiddleware from '../middlewares/validation.middleware';
import { loginSchema, registerSchema } from '../validations/Joi';
import { isAuthenticated } from '../middlewares/auth';

const router = Router();

router.post('/register', validationMiddleware(registerSchema), register);

router.post('/login', validationMiddleware(loginSchema), login);

router.get('/logout', isAuthenticated, logout);

router.get('/refresh', refreshAccessToken);

router.all('*', (req : Request, res : Response, next : NextFunction) => {
    const error = new RouteNowFoundError(`Route : ${req.originalUrl} not found`);
    next(error);
});

export default router;