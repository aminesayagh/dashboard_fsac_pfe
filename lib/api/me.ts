import { STATE_USER_ROLE } from '@/constants/db';
import fetchServiceApi from '@/helpers/fetchApi';
import { ObjectValue } from '@/types/helpers';
import { IUserFromJsonMongodbWithoutPassword, IUserToUpdate } from '@/types/mongodb/User';
import { IStudentToUpdate } from '@/types/mongodb/Student';
import { Types } from 'mongoose';

import { getMeQuery, putMeBody } from '@/pages/api/access/me'
import { IProfile } from '@/types/Auth';
import { AxiosResponse } from 'axios';

const convertObjectIdToString = (id: Types.ObjectId | string) => {
    return typeof id == 'string' ? id : String(id);
}

const getMe = async (query: { email: string }): Promise<AxiosResponse<IProfile>> => {
    try {
        const queryValid = await getMeQuery.parseAsync(query);
        const res = await fetchServiceApi<IProfile>('access/me', 'get', { ...queryValid });
        console.log(res);
        return res;
    } catch (err) {
        console.log('Error get me in client side', query, err);
        throw new Error('error get me')
    }

}

export type IPutProfile = { id: Types.ObjectId | undefined, value: IUserToUpdate, student?: IStudentToUpdate } | { id: Types.ObjectId | undefined, value?: IUserToUpdate, student: IStudentToUpdate }
const putProfile = async (data: IPutProfile) => {
    if (!data.id) throw new Error('You need a id to update user data')
    try {
        const idString = convertObjectIdToString(data.id);
        delete data.id;
        const body = await putMeBody.parseAsync({ data, id: idString });
        return await fetchServiceApi<IProfile>('access/me', 'put', body)
    } catch (err) {
        console.log('error put profile', err, 'query', data);
        throw new Error('error put me')
    }
}

export default {
    get: getMe,
    put: putProfile,
}