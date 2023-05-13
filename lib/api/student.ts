import { queryClient } from '@/context/provider/QueryClient';
import { IStudent } from '@/types/Auth';
import { AxiosResponse } from 'axios';
import { Types } from 'mongoose';
import fetchServiceApi from '../../helpers/fetchApi';

const getStudents = async ({ page, limit }: { page: number, limit: number }): Promise<AxiosResponse<IStudent[]>> => {
    try{
        return await fetchServiceApi<IStudent[]>('student', 'get', { page, limit })
    }catch(err: any){
        throw new Error(err.message);
    }
}

export default {
    get: getStudents
}