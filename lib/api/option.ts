import fetchServiceApi from "../../helpers/fetchApi"
import { IOptionCredential } from '@/types/mongodb/Option';
import { AxiosResponse } from 'axios';

import { OptionPfe } from '@/constants/db';

const getOption = async() => {
    return await fetchServiceApi<IOptionCredential[]>('option', 'get', {});
}

export interface IPostOption {
    name: OptionPfe
}
const postOption = async (query: IPostOption): Promise<AxiosResponse<IOptionCredential>> => {
    try{
        return await fetchServiceApi<IOptionCredential>('option', 'post', { name: query.name })
    }catch(err){
        console.log('error post option', err, 'query', query);
        throw new Error('error post option');
    }
}

export default {
    get: getOption,
    post: postOption,
}