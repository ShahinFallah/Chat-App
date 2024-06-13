import { eq } from 'drizzle-orm';
import type { TInferSelectUser } from '../../@types';
import { db } from '../db';
import { ConversationTable } from '../schema';


export const searchByUsername = async (username : string) : Promise<Omit<TInferSelectUser, 'password'>[]> => {
    return await db.query.UserTable.findMany({where : (table, funcs) => funcs.ilike(table.username, username), 
        columns : {password : false}, limit : 5}) as Omit<TInferSelectUser, 'password'>[];
}

export const findFirstById = async (userId : string) : Promise<Omit<TInferSelectUser, 'password'>> => {
    return await db.query.UserTable.findFirst({where : (table, funcs) => funcs.eq(table.id, userId), 
        columns : {password : false}}) as Omit<TInferSelectUser, 'password'>;
}

export const findManyParticipants = async (userId : string) => {
    return await db.query.ParticipantTable.findMany({where : (table, funcs) => funcs.eq(table.userId, userId)});
}

export const findManyParticipantsByConversationIds = async (conversationId : string[]) => {
    return await db.query.ParticipantTable.findMany({
        where : (table, funcs) => funcs.inArray(table.conversationId, conversationId),
        with : {user : {columns : {password : false}}}
    });
}

export const findLastMessage = async (conversationId : string[]) => {
    const messages = await db.query.MessageTable.findMany({
        where : (table, funcs) => funcs.inArray(table.conversationId, conversationId),
        orderBy : (table, funcs) => funcs.desc(table.createdAt)
    });

    const messageWithConversationGroup = messages.map(message => message);
    return messageWithConversationGroup;
}

export const deleteConversationById = async (conversationId : string) => {
    await db.delete(ConversationTable).where(eq(ConversationTable.id, conversationId));
}