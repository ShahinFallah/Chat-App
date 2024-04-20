import { faker } from '@faker-js/faker';
import User from '../models/userModel';
import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/', async (req : Request, res : Response) => {

    const password = faker.string.alpha('hello world');
    const fullName = faker.person.fullName()
    const username = faker.internet.userName();
    const gender = faker.person.sex();
    const profilePic = faker.image.url();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        fullName,
        username,
        password : hashedPassword,
        gender,
        profilePic
    });

    await user.save();
    
    res.status(201).json({message : 'user created'});
});

export default router;