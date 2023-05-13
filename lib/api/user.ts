import { IUserAuthInFront } from "@/types/mongodb/User";
import { Types } from "mongoose";
import fetchServiceApi from '../../helpers/fetchApi';
import { convertObjectIdToString } from "@/helpers/database";
import { IProfile } from "@/types/Auth";

import { QueryParams, Pagination } from '@/types/table';
import { STATE_USER_ROLE } from "@/constants/db";

const getUser = async({ id }: {id: Types.ObjectId | string }) => {
    if(!id) throw new Error('You need a id profile to get data user');
    try{
        const idString = convertObjectIdToString(id);
        return await fetchServiceApi<IProfile>('user', 'get', { id: idString });
    }catch(err){
        console.log(err);
        throw new Error('error get user')
    }
}

const getUsers = async ({ params, roles }: { params?: QueryParams, roles: (typeof STATE_USER_ROLE[keyof typeof STATE_USER_ROLE])[] }) => {
    try {
        return await fetchServiceApi<{ data: Array<IUserAuthInFront>, pagination: Pagination }>('user', 'get', { ...params, roles: roles })
    } catch (err: any) {
        console.log(err);
        throw new Error(err.message);
    }
}

export type UserUpdate = {
    _id: string | Types.ObjectId;
} & Partial<Omit<IUserAuthInFront, '_id'>>;

const putUser = async({ id, data }: { id: Types.ObjectId | string, data: Partial<IUserAuthInFront> }) => {
    if(!id) throw new Error('You need a id profile to get data user');
    try{
        const idString = convertObjectIdToString(id);
        return await fetchServiceApi<IUserAuthInFront>('user', 'put', { id: idString, data });
    }catch(err){
        console.log(err);
        throw new Error('error get user')
    }
}

export default {
    putOne: putUser,
    getOne: getUser,
    getMany: getUsers
}