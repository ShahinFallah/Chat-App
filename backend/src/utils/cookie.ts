import type { Response } from 'express';
import type { TCookieOption } from '../@types';


export const cookie = (token : string, option : TCookieOption, res : Response) => {
    res.cookie('access_token', token, option);
}