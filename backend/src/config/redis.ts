import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

export const client = createClient({
    url : process.env.Redis_Url
});