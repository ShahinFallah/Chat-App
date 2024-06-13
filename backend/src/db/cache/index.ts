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

export const insertInToCacheSetList = async <T extends unknown>(key : string, value : T) => {
    await redis.sadd(key, JSON.stringify(value)) as T;
};

export const insertInToCacheList = async <T extends unknown>(key : string, value : T) => {
    await redis.rpush(key, JSON.stringify(value));
}

export const findInCacheList = async <T extends unknown>(key : string) => {
    const data = await redis.lrange(key, 0, -1);
    return data.map(data => JSON.parse(data)) as T;
}