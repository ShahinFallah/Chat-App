import redis from '../redis';

export const insertIntoCache = async <T extends unknown>(key : string, value : T, expiresTime : number) : Promise<void> => {
    await redis.hset(key, value!);
    await setCacheExpiresTime(key, expiresTime);
}

export const setCacheExpiresTime = async (key : string, expiresTime : number) => {
    await redis.expire(key, expiresTime);
}

export const findInCache = async <T>(key : string) : Promise<T> => {
    return await redis.hgetall(key) as T;
}

export const deleteFromCache = async (key : string) : Promise<void> => {
    await redis.del(key);
}