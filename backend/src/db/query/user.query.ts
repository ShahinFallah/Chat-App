import type { InferInsertModel } from 'drizzle-orm';
import type { TInferSelectUser } from '../../@types';
import { db } from '../db'
import { UserTable } from '../schema';


export const findFirstUser = async (id : string | undefined, username : string | undefined) => {
    return await db.query.UserTable.findFirst({
        where : (table, funcs) => funcs.or(id == undefined ? undefined : funcs.eq(table.id, id), 
        username == undefined ? undefined : funcs.eq(table.username, username))
    }) as TInferSelectUser;
}

export const insertUser = async (value : TInferSelectUser) : Promise<Omit<TInferSelectUser, 'password'>> => {
    const user : InferInsertModel<typeof UserTable>[] = await db.insert(UserTable).values(value).returning();
    const {password, ...others} = user[0] as TInferSelectUser
    return others;
}