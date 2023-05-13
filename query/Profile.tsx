import React from 'react';

import { UseSessionUser } from '@/components/render';
import { Session } from 'next-auth';
import { UseReactQuery } from '@/components/render/ReactQueryWrapper';

import { IProfile, IProfileUpdate } from 'types/Auth';
import meApi, { IPutProfile } from '@/lib/api/me';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/context/provider/QueryClient';

export const mutationProfile = () => {
    return useMutation<IProfile, any, IPutProfile>(({ id, ...dataProfile }) => meApi.put({ id, ...dataProfile }).then(r => r.data), {
        onMutate: async (newProfile) => {
            await queryClient.cancelQueries([`profile`]);
            const previousProfile = queryClient.getQueriesData([`profile`]);
            queryClient.setQueryData<IProfile>([`profile`], (oldProfile) => {
                if (!oldProfile) return;
                return { ...oldProfile, ...newProfile };
            });
            return { previousProfile };
        },
        onError: (err, newProfile, context: any) => {
            console.error('error mutate profile', err);
            queryClient.setQueryData([`profile`], context.previousProfile);
        },
        onSettled: (newProfile) => {
            if (!newProfile) return;
            queryClient.invalidateQueries([`profile`]);
        }
    });
}

const QueryProfile = ({ session, render }: { session: Session, render: ({ profile }: { profile: IProfile }) => React.ReactElement }) => {
    return (
        <>
            <UseReactQuery<IProfile> query={{
                queryKey: [`profile`],
                queryFn: async () => {
                    const { data } = await meApi.get({ email: session.user.email });
                    if (!data) {
                        console.log('no profile, create one', data);
                        throw new Error('no profile, create one')
                    }
                    return data;
                }
            }} >
                {({ data }) => render({ profile: data })}
            </UseReactQuery>
        </>
    )
}

interface ProfileProps {
    render: ({ profile }: { profile: IProfile }) => React.ReactElement;
}

const Profile: React.FC<ProfileProps> = React.memo(({ render }) => {
    return (
        <UseSessionUser
            render={({ session }) => {
                return <QueryProfile session={session} render={render} />;
            }}
        />
    );
});


export default Profile;