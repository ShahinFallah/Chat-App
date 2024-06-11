import type { TInferSelectConversation, TInferSelectMessage, TInferSelectParticipant } from '../../@types';
import { db } from '../db';
import { ConversationTable, MessageTable, ParticipantTable } from '../schema';


export const findManyParticipantByUsersId = async (senderId : string, receiverId : string) => {
    const participants = await db.query.ParticipantTable.findMany({
        where : (table, funcs) => funcs.or(funcs.eq(table.userId, senderId), funcs.eq(table.userId, receiverId))
    });

    const firstPerson : TInferSelectParticipant[] = participants.filter(participant => participant.userId === senderId);
    const secondPerson : TInferSelectParticipant[] = participants.filter(participant => participant.userId === receiverId);
    return {firstPerson, secondPerson};
}

export const insertNewConversation = async (firstPersonId : string, secondPersonId : string) => {
    const conversation = await db.insert(ConversationTable).values({}).returning() as TInferSelectConversation[];
    const firstPersonParticipant = await db.insert(ParticipantTable).values({conversationId : conversation[0].id, 
        userId : firstPersonId}).returning() as TInferSelectParticipant[];
        
    const secondPersonParticipant = await db.insert(ParticipantTable).values({conversationId : conversation[0].id, 
        userId : secondPersonId}).returning() as TInferSelectParticipant[];
        
    return {firstPersonParticipant : firstPersonParticipant[0], conversation : conversation[0],
        secondPersonParticipant : secondPersonParticipant[0]}
}

export const findFirstParticipantByConversationId = async (conversationId : string) => {
    const participantUsersInfo = await db.query.ParticipantTable.findMany({
        where : (table, funcs) => funcs.eq(table.conversationId, conversationId),
        with : {user : true}
    });

    return {firstPersonInfo : participantUsersInfo[0], secondPersonInfo : participantUsersInfo[1]}
}

export const insertNewMessage = async (senderId : string, receiverId : string, conversationId : string, messageText : string) => {
    const message = await db.insert(MessageTable).values({conversationId, senderId, receiverId, message : messageText}).returning();
    return message [0] as TInferSelectMessage;
}

export const findManyMessageByConversationId = async (conversationId : string) : Promise<TInferSelectMessage[]> => {
    return await db.query.MessageTable.findMany({
        where : (table, funcs) => funcs.eq(table.conversationId, conversationId)
    });
}