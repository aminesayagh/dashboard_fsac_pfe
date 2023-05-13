import { Types } from "mongoose"
import { convertObjectIdToString } from "@/helpers/database";
import fetchServiceApi from "@/helpers/fetchApi";
import { ObjectValue } from "@/types/helpers";
import { OptionPfe, STATE_USER_ROLE } from "@/constants/db";
import { IGroupePfeJsonMongodb, IGroupPfe } from "@/types/mongodb/GroupPfe";

import { AxiosResponse } from 'axios';

export type TQueryPost = {
    id: Types.ObjectId,
    option: OptionPfe
}

import { IResponseGetGroupePfe } from '@/pages/api/groupePfe';
import { TRole } from "@/types/mongodb/User";
import { IMemberGroupePfeJsonMongodb } from "@/types/mongodb/MemberPfe";

const getGroupePfe = async (query: { id: Types.ObjectId, role: TRole }): Promise<AxiosResponse<IResponseGetGroupePfe>>  => {
    if(!query.id) throw new Error('You need a id profile to get data groupe pfe');
    try{
        const idString = convertObjectIdToString(query.id);
        return await fetchServiceApi<IResponseGetGroupePfe>('groupePfe', 'get', {
            role: query.role,
            id: idString
        });
    }catch(err) {
        console.log(err);
        throw new Error('error get groupe pfe')
    }
}

export interface IResponsePostGroupePfe {
    groupePfe: IGroupePfeJsonMongodb,
    memberPfe: IMemberGroupePfeJsonMongodb
}
const postGroupePfe = async (query: TQueryPost) => {
    if(!query.id) throw new Error('You need a id profile to get data groupe pfe');
    try{
        const idString = convertObjectIdToString(query.id);
        return await fetchServiceApi<IResponsePostGroupePfe>('groupePfe', 'post', {
            id: idString,
            option: query.option
        });
    }catch(err) {
        console.log(err);
        throw new Error('error post groupe pfe')
    }
}

export type TQueryPut = {
    id: Types.ObjectId,
    value: Partial<IGroupPfe>
}
const putGroupePfe = async (query: TQueryPut) => {
    if(!query.id) throw new Error('You need a id profile to get data groupe pfe');
    try{
        const idString = convertObjectIdToString(query.id);
        return await fetchServiceApi('groupePfe', 'put', {
            id: idString,
            value: query.value
        });
    }catch(err){
        console.log(err);
        throw new Error('error put groupe pfe')
    }
}
export default {
    get: getGroupePfe,
    post: postGroupePfe,
    put: putGroupePfe
}