import { findInCache } from '.';
import type { TInferSelectMessage, TInferSelectUser } from '../../@types';
import { regexp } from '../../utils/regexQuery';
import redis from '../redis';

export const searchCacheForUsername = async (username : string, currentUserId : string) : Promise<Omit<TInferSelectUser, 'password'>[]> => {
    let cursor = '0';
    let matchedResult : Omit<TInferSelectUser, 'password'>[] = [];
    const regex = regexp(username);

    do {
        const [newCursor, keys] = await redis.scan(cursor, 'MATCH', 'user:*', 'COUNT', 100);
        for (const key of keys) {
            const user : Omit<TInferSelectUser, 'password'> = await findInCache(key);
            if(regex.test(user.username)) matchedResult.push(user);
        }

        cursor = newCursor;
    } while (cursor !== cursor);
    return matchedResult.filter(user => user.id !== currentUserId);
}