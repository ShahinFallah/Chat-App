import type { InferSelectModel } from 'drizzle-orm';
import type { ConversationTable, MessageTable, ParticipantTable, UserTable } from '../db/schema';

type TInferSelectUser = InferSelectModel<typeof UserTable>;
type TInferSelectConversation = InferSelectModel<typeof ConversationTable>;
type TInferSelectParticipant = InferSelectModel<typeof ParticipantTable>;
type TInferSelectMessage = InferSelectModel<typeof MessageTable>;

declare global {namespace Express {interface Request {user? : Omit<TInferSelectUser, 'password'>;}}}

type TParticipantWithUsersInfo = {id: string; conversationId: string | null; userId : string | null; user: { id: string; fullName: string; username: string; 
createdAt: Date | null; updatedAt: Date | null; } | null; }[]

type TErrorHandler = {statusCode : Number; message : string}

type TCookieOption = {expires : Date; maxAge : number; httpOnly : boolean; sameSite : 'lax' | 'strict' | 'none' | undefined; secure? : boolean}