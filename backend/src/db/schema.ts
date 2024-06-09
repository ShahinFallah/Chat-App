import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';

export const UserTable = pgTable('users', {
    id : uuid('id').primaryKey().defaultRandom(),
    fullName : varchar('fullName', {length : 255}).notNull(),
    username : varchar('username', {length : 255}).notNull(),
    password : varchar('password', {length : 255}).notNull(),
    createdAt : timestamp('createdAt').defaultNow(),
    updatedAt : timestamp('updatedAt').defaultNow().$onUpdate(() => new Date())
}, table => {
    return {usernameIndex : uniqueIndex('usernameIndex').on(table.username)}
});

export const ConversationTable = pgTable('conversations', {
    id : uuid('id').primaryKey().defaultRandom(),
    createdAt : timestamp('createdAt').defaultNow(),
    updatedAt : timestamp('updatedAt').defaultNow().$onUpdate(() => new Date())
});

export const ParticipantTable = pgTable('participants', {
    id : uuid('id').primaryKey().defaultRandom(),
    conversationId : uuid('conversation_id').references(() => ConversationTable.id).unique(),
    userId : uuid('userId').references(() => UserTable.id),
});

export const MessageTable = pgTable('messages', {
    id : uuid('id').primaryKey().defaultRandom(),
    conversationId : uuid('conversation_id').references(() => ConversationTable.id),
    senderId : uuid('senderId').references(() => UserTable.id),
    receiverId : uuid('receiverId').references(() => UserTable.id),
    message : varchar('message', {length : 500}).notNull(),
    createdAt : timestamp('createdAt').defaultNow(),
    updatedAt : timestamp('updatedAt').defaultNow().$onUpdate(() => new Date())
});

export const UserTableRelations = relations(UserTable, ({one, many}) => {
    return {
        participants : many(ParticipantTable),
        sendedMessages : one(MessageTable, {
            fields : [UserTable.id],
            references : [MessageTable.senderId],
            relationName : 'senderMessage'
        }),
        receiversMessages : one(MessageTable, {
            fields : [UserTable.id],
            references : [MessageTable.receiverId],
            relationName : 'receiverMessages'
        })
    }
});

export const ParticipantTableRelations = relations(ParticipantTable, ({one, many}) => {
    return {
        conversation : one(ConversationTable, {
            fields : [ParticipantTable.conversationId],
            references : [ConversationTable.id],
            relationName : 'participantsConversation'
        }),
        user : one(UserTable, {
            fields : [ParticipantTable.userId],
            references : [UserTable.id],
            relationName : 'participant'
        })
    }
})

export const MessageTableRelations = relations(MessageTable, ({one, many}) => {
    return {
        conversation : one(ConversationTable, {
            fields : [MessageTable.conversationId],
            references : [ConversationTable.id],
            relationName : 'messageConversation'
        }),
        sender : one(UserTable, {
            fields : [MessageTable.senderId],
            references : [UserTable.id],
            relationName : 'sender'
        }),
        receiver : one(UserTable, {
            fields : [MessageTable.receiverId],
            references : [UserTable.id],
            relationName : 'receiver'
        }),
    }
})