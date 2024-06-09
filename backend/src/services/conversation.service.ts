import type { TInferSelectUser } from '../@types';
import { findInCache } from '../db/cache';
import { searchCacheForUsername } from '../db/cache/conversation.cache';
import { findFirstById, searchByUsername } from '../db/query/conversation.query';
import { ResourceNotFoundError } from '../utils/customErrors';
import ErrorHandler from '../utils/errorHandler'
import { regexQueryForPostgres } from '../utils/regexQuery';


export const searchUserService = async (query : string, currentUserId : string) : Promise<Omit<TInferSelectUser, 'password'>[]> => {
    try {
        const username : string = regexQueryForPostgres(query);

        const redisSearchResult : Omit<TInferSelectUser, 'password'>[] = await searchCacheForUsername(query, currentUserId);
        if(redisSearchResult.length > 0) return redisSearchResult.slice(0, 5);

        const searchResult : Omit<TInferSelectUser, 'password'>[] = await searchByUsername(username);
        if(searchResult.length <= 0) throw new ResourceNotFoundError();
        return searchResult;
        
    } catch (error : any) {
        throw new ErrorHandler(`An error occurred : ${error.message}`, error.statusCode);
    }
}

export const newConversationService = async (userId : string) : Promise<Omit<TInferSelectUser, 'password'>> => {
    try {
        const cachedUser : Omit<TInferSelectUser, 'password'> = await findInCache(`user:${userId}`);
        if(Object.keys(cachedUser).length > 0) return cachedUser;

        const user : Omit<TInferSelectUser, 'password'> = await findFirstById(userId);
        if(!user) throw new ResourceNotFoundError();
        return user;
        
    } catch (error : any) {
        throw new ErrorHandler(`An error occurred : ${error.message}`, error.statusCode);
    }
}