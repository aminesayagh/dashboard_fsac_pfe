import React, { createContext } from 'react';
import { useInterpret } from '@xstate/react';
import groupePfeMachine from '@/machine/pfeMachine';

export const GlobalStateContext = createContext<{ groupePfeService: any }>({ groupePfeService: null });
import groupePfeApi from '@/lib/api/groupePfe';

import { ContextData } from '@/types/groupePfe'

import { STATE_USER_ROLE } from '@/constants/db';

const GroupePfeProviderMachine = ({ profile, children }: { children: React.ReactElement, profile: IProfile }) => {
    const groupePfeService = useInterpret(groupePfeMachine, {
        services: {
            getContextGroupePfe: async () => {
                if(!profile.statusUserRole) throw new Error('Error: check status user role value')
                const { data } = await groupePfeApi.get({ id: profile._id, role: profile.statusUserRole});
                const { groupePfe, memberPfe, supervisorPfe, ...otherData } = data;
                return { groupePfe, memberPfe, supervisorPfe, profile: profile };
            }
        }
    });

    return (
        <>
            <GlobalStateContext.Provider value={{ groupePfeService }} >
                {children}
            </GlobalStateContext.Provider>
        </>
    )
}

import Profile from '@/query/Profile'
import { IProfile } from '@/types/Auth';

const GroupePfeProvider = ({ children }: { children: React.ReactElement }) => {
    return (
        <>
            <Profile render={({ profile }) => {
                console.log('profile', profile)
                return <>
                    <GroupePfeProviderMachine profile={profile} >
                        {children}
                    </GroupePfeProviderMachine>
                </>
            }} />
        </>
    )
}

export default GroupePfeProvider