import req from '@/helpers/http-common';
import { AxiosResponse, RawAxiosRequestConfig } from 'axios';
import qs from 'qs';
type Method = 'get' | 'put' | 'post' | 'delete'

export default async function fetchServiceApi<T extends unknown>(breakpoint: string, method: Method, query: object, options?: RawAxiosRequestConfig): Promise<AxiosResponse<T>> {
    let response: AxiosResponse<T> | null = null;
    
    try{
        if(method == 'get') {
            const formattedQuery = Object.entries(query).reduce((acc, [key, value]) => {
                if (Array.isArray(value)) {
                    const objectFromArrayOfStrings = value.reduce((obj, item, index) => {
                        obj[`${key}${index}`] = item;
                        return obj;
                    }, {});
                    acc = { ...acc, ...objectFromArrayOfStrings };
                } else {
                    // @ts-ignore
                    acc[key] = value;
                }
                return acc;
            }, {});
            const queryString = qs.stringify(formattedQuery);
            response = await req[method]<T>(`/api/${breakpoint}?${queryString}`)
        } else {
            response = await req[method]<T>(`/api/${breakpoint}`, {
                ...query
            }, options)
        }
    }catch(err: any){
        console.log(err);
        throw new Error('Error fetching api', err?.message);
    }
    if(!response) throw new Error('Error fetching api');
    return response;
}