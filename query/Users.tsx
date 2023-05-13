import { UseReactQuery } from "@/components/render"
import { IUserAuthInFront } from "@/types/mongodb/User"
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from 'axios';
import { Pagination } from '@/types/table';


import user from '@/lib/api/user';
import { ObjectValue } from "@/types/helpers";
import { STATE_USER_ROLE } from "@/constants/db";

interface QueryParms {
    _page: number;
    _limit: number;
    _sort: string;
}


export const QueryUsers = <T extends unknown>(roles: ObjectValue<typeof STATE_USER_ROLE>[], serialisation: (users: IUserAuthInFront, index: number) => T)  => ({ pageIndex, pageSize, sortedBy }: { pageIndex: number, pageSize: number, sortedBy: string }) => {
    return useQuery({
        queryKey: ['users', { pageIndex, pageSize, sortedBy }],
        queryFn: async () => {
            const queryParms: QueryParms = {
                _page: pageIndex,
                _limit: pageSize,
                _sort: sortedBy
            }
            const { data, status }: AxiosResponse<{ data: Array<IUserAuthInFront>, pagination: Pagination }, any> = await user.getMany({ params: queryParms, roles });
            return { data: data.data.map<T>(serialisation), pagination: data.pagination };
        },
        refetchOnWindowFocus: true,
    })
}