
import React from 'react';
import UseProfile from '@/query/Profile'
import { IProfile } from '@/types/Auth';
import { UseReactQuery } from '@/components/render/ReactQueryWrapper';

import { ContextData as IGroupePfe } from '@/types/groupePfe'
type TRender = {
    groupePfe: IGroupePfe
}
import groupePfeApi, { TQueryPost } from '@/lib/api/groupePfe';
import { STATE_USER_ROLE } from '@/constants/db';
import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/context/provider/QueryClient';
import { Types } from 'mongoose';
import { IResponseGetGroupePfe } from '@/pages/api/groupePfe';

// post new groupe pfe
export const postGroupePfe = () => {
    return useMutation((data: TQueryPost) => groupePfeApi.post(data).then(data => data), {
        onMutate: async (newGroupePfe) => {
            return newGroupePfe;
        },
        onError: (err, newGroupePfe, context: any) => {
            console.error('error mutate groupePfe', err);
            queryClient.setQueriesData(['groupePfe'], context.previousOption);
            throw new Error('error mutate groupePfe');
        },
        onSettled: (newGroupePfe) => {
            if (!newGroupePfe) return;
            queryClient.invalidateQueries(['groupePfe']);
        }
    });
}


const QueryGroupePfe = ({ profile, render }: { profile: IProfile, render: ({ groupePfe }: TRender) => React.ReactElement }) => {
    return (
        <>
            <UseReactQuery<IResponseGetGroupePfe> query={{
                queryKey: ['groupePfe'],
                queryFn: async () => {
                    const { data } = await groupePfeApi.get({ id: profile._id, role: profile.statusUserRole || STATE_USER_ROLE.STUDENT });
                    return { ...data }
                }
            }} >
                {({ data }) => render({ groupePfe: { ...data, profile } })}
            </UseReactQuery>
        </>
    )
}
const GroupePfe = ({ render }: { render: ({ groupePfe }: TRender) => React.ReactElement }) => {
    return (
        <>
            <UseProfile render={({ profile }) => {
                return <QueryGroupePfe profile={profile} render={render} />
            }} />
        </>
    )
}

export default GroupePfe;