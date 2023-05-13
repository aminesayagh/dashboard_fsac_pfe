// global resources
import React, { useEffect, useState } from 'react'

// style
import GroupePfeStyle from './GroupePfe.module.scss'

import groupePfeMachine from '@/machine/pfeMachine';

import { STATE_USER_ROLE } from '@/constants/db';

import Profile from '@/query/Profile'
import { IProfile } from '@/types/Auth';
import { useMachine } from '@xstate/react';
import groupePfeApi from '@/lib/api/groupePfe';

import { useTranslation } from 'react-i18next';

import { DialogTask } from 'components/dialog'
import { StudentInvitationTable } from '@/table/StudentInvitation';

import { AsyncRenderComponent, Right } from '@/components/render';
import { Card, Row, Table } from '@/components/commun';

import { TTableMode } from '@/types/table';

const TableInvitationStudent = () => {
    const [mode, setMode] = useState<TTableMode>('table');
    // const { table, isLoading, setPagination, pagination, isFetching } = StudentInvitationTable();
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(10);

    // useEffect(() => {
    //     const startPage = (pagination.pageIndex - 1) * pagination.pageSize;
    //     const endPage = startPage + pagination.pageSize;

    //     setStart(startPage);
    //     setEnd(endPage);
    // }, [pagination.pageIndex, pagination.pageSize])

    return (
        <>
            <AsyncRenderComponent isLoading={false}>
                <>
                    <Table.Header setMode={setMode} mode={mode} />
                    {mode == 'table' ? <></> : <></>}
                </>

            </AsyncRenderComponent>
        </>
    )

}

const GroupePfeMachine = ({ profile }: { profile: IProfile }) => {
    const { t } = useTranslation(['dialog']);

    const [state, send] = useMachine(groupePfeMachine, {
        services: {
            getContextGroupePfe: async () => {
                if (!profile.statusUserRole) {
                    throw new Error('Error: check status user role value')
                }

                const { data } = await groupePfeApi.get({ id: profile._id, role: profile.statusUserRole });
                const { groupePfe, memberPfe, supervisorPfe, ...otherData } = data;
                return { groupePfe, memberPfe, supervisorPfe, profile: profile };
            }
        }
    })

    send('FETCH');
    return (
        <>
            <pre>{JSON.stringify(state.value)}</pre>
            <pre>{JSON.stringify(state.context)}</pre>
            <div>
                {state.matches('SUCCESS') && (
                    <>
                        {state.matches('SUCCESS.GROUP PFE.TO_CREATE.IDLE') && <><DialogTask title={t('add_groupe_pfe.title')} desc={t('add_groupe_pfe.description')} mainAction={{
                            name: t('add_groupe_pfe.mainAction'),
                            handler: () => {
                                if (!profile.studentDoc?.option[0]._id) throw new Error('Error: check option value');
                                groupePfeApi.post({ id: profile._id, option: profile.studentDoc?.option[0].name }).then(({ data }) => {
                                    send({ type: "Post Member", data: { member: data.memberPfe, groupePfe: data.groupePfe } })
                                })
                            }
                        }} /></>}
                        {state.matches('SUCCESS.GROUP PFE.TO_CREATE.ON_HOLD') && <>
                            <div>
                                <div>
                                    <DialogTask title={t('invite_member_pfe.title')} desc={t('invite_member_pfe.description')} />
                                </div>
                                <div>
                                    <TableInvitationStudent />
                                </div>
                            </div>
                        </>}
                        {state.matches('SUCCESS.GROUP PFE.TO_CREATE.IDLE') && <>Groupe Pfe on IDLE</>}
                        {state.matches('SUCCESS.GROUP PFE.TO_CREATE.ON_HOLD') && <>Groupe Pfe on hold</>}
                    </>
                )}
            </div>
        </>
    )
}

const GroupePfeList = () => {
    return (
        <>

        </>
    )
}

const GroupePfe = ({ }) => {

    return (
        <>
            <Profile render={({ profile }) => {
                if (profile.statusUserRole.includes(STATE_USER_ROLE.STUDENT)) {
                    return <GroupePfeMachine profile={profile} />
                }
                if (profile.statusUserRole.includes(STATE_USER_ROLE.PROFESSOR) || profile.statusUserRole.includes(STATE_USER_ROLE.ADMIN)) {
                    return <GroupePfeList />
                }
                return <></>
            }} />
        </>
    )
}

export default GroupePfe;