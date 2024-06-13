import type { TInferSelectMessage, TInferSelectParticipant, TInferSelectUser, TParticipantWithUsersInfo } from '../@types';
import { findInCache, findInCacheList } from '../db/cache';
import { searchCacheForUsername } from '../db/cache/conversation.cache';
import { findParticipantsInCache } from '../db/cache/message.cache';
import { findFirstById, findManyParticipantsByConversationIds, findLastMessage, findManyParticipants, searchByUsername, deleteConversationById } 
from '../db/query/conversation.query';
import { ResourceNotFoundError } from '../utils/customErrors';
import ErrorHandler from '../utils/errorHandler'
import { regexQueryForPostgres } from '../utils/regexQuery';
import { getReceiverSocketId, io } from '../webSocket/socket.io';


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

export const getConversationsService = async (currentUserId : string) => {
    try {
        let participants : TInferSelectParticipant[];
        let lastMessages : TInferSelectMessage[];

        const participantsCache : {firstPersonCache : TInferSelectParticipant[], secondPersonCache : TInferSelectParticipant[]
        } = await findParticipantsInCache(`participants:user:${currentUserId}`, undefined);
        if(participantsCache.firstPersonCache.length <= 0) participants = await findManyParticipants(currentUserId);

        participants = participantsCache.firstPersonCache;
        const conversationId : string[] = participants.map(participant => participant.conversationId as string);

        const usersParticipants = await findManyParticipantsByConversationIds(conversationId); 
        const filteredUsers : TParticipantWithUsersInfo = usersParticipants.filter(users => users.userId !== currentUserId);

        const lastMessagesCache : TInferSelectMessage[] = await findInCacheList(`message:${conversationId}`);
        if(lastMessagesCache.length <= 0) lastMessages = await findLastMessage(conversationId);

        lastMessages = lastMessagesCache;
        const uniqueLastMessagesMap : Map<any, any> = new Map();
        lastMessages.forEach(message => {

            const existingMessage : TInferSelectMessage = uniqueLastMessagesMap.get(message.conversationId);
            if(!existingMessage || new Date(message.createdAt!) > new Date(existingMessage.createdAt!)) {
                uniqueLastMessagesMap.set(message.conversationId, message);
            }
        });
        
        const uniqueLastMessages : TInferSelectMessage[] = Array.from(uniqueLastMessagesMap.values());
        const result = combineResultConversations(filteredUsers, uniqueLastMessages);
        return result;
        
    } catch (error : any) {
        throw new ErrorHandler(`An error occurred : ${error.message}`, error.statusCode);
    }
}

export const combineResultConversations = (conversations : TParticipantWithUsersInfo, lastMessage : TInferSelectMessage[]) => {
    const conversation = conversations.map(conversation => {
        const user : TInferSelectUser = conversation.user as TInferSelectUser;
        return {
            id : conversation.id, conversationId : conversation.conversationId, userId : conversation.userId,
            user : user,
            lastMessage : lastMessage.filter(message => message.conversationId === conversation.conversationId)[0]
        }
    });
    return conversation;
}

export const deleteConversationService = async (conversationId : string, currentUserId : string, userToModify : string) => {
    try {
        let participants : TInferSelectParticipant[];
        let lastMessage : TInferSelectMessage[];
        await deleteConversationById(conversationId);

        const participantsCache : {firstPersonCache : TInferSelectParticipant[], secondPersonCache : TInferSelectParticipant[]
        } = await findParticipantsInCache(`participants:user:${currentUserId}`, undefined);
        if(participantsCache.firstPersonCache.length <= 0) participants = await findManyParticipants(currentUserId);

        participants = participantsCache.firstPersonCache;
        const conversationsId : string[] = participants.map(participant => participant.conversationId as string);
        
        const usersParticipants : TParticipantWithUsersInfo = await findManyParticipantsByConversationIds(conversationsId);
        const filteredUsers : TParticipantWithUsersInfo = usersParticipants.filter(user => user.userId !== currentUserId);

        const lastMessagesCache : TInferSelectMessage[] = await findInCacheList(`message:${conversationId}`);
        if(lastMessagesCache.length <= 0) lastMessage = await findLastMessage(conversationsId);

        lastMessage = lastMessagesCache;
        const uniqueLastMessagesMap : Map<any, any> = new Map();
        lastMessage.forEach(message => {

            const existingMessage : TInferSelectMessage = uniqueLastMessagesMap.get(message.conversationId);
            if(!existingMessage || new Date(message.createdAt!) > new Date(existingMessage.createdAt!)) {
                uniqueLastMessagesMap.set(message.conversationId, message);
            }
        });

        const uniqueLastMessages : TInferSelectMessage[] = Array.from(uniqueLastMessagesMap.values());
        const result = combineResultConversations(filteredUsers, uniqueLastMessages);
        
        const receiverSocketId : string | undefined = getReceiverSocketId(userToModify);
        io.to(receiverSocketId!).emit(`deleteConversation`, {conversations : result, deletedUserId : currentUserId});
        return result;
        
    } catch (error : any) {
        throw new ErrorHandler(`An error occurred : ${error.message}`, error.statusCode);
    }
}