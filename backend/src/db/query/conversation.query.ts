import type { TInferSelectUser } from '../../@types';
import { db } from '../db';


export const searchByUsername = async (username : string) : Promise<Omit<TInferSelectUser, 'password'>[]> => {
    return await db.query.UserTable.findMany({where : (table, funcs) => funcs.ilike(table.username, username), 
        columns : {password : false}, limit : 5}) as Omit<TInferSelectUser, 'password'>[];
}

export const findFirstById = async (userId : string) : Promise<Omit<TInferSelectUser, 'password'>> => {
    return await db.query.UserTable.findFirst({where : (table, funcs) => funcs.eq(table.id, userId), 
        columns : {password : false}}) as Omit<TInferSelectUser, 'password'>;
}