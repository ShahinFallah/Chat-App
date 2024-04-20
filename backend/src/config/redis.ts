// import { createClient } from 'redis';
import Redis from 'ioredis'

export const client = new Redis(process.env.REDIS_URL);