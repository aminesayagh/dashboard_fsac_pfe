
import { createColumnHelper } from '@tanstack/react-table';


export type StudentColumn = {
    userId: string;
    img?: string;
    first_name?: string;
    last_name?: string;
    email: string;
    invitableUser?: boolean;
}

const columnHelper = createColumnHelper<StudentColumn>();

import { User, Tooltip } from "@nextui-org/react";
import { useTranslation } from 'react-i18next';

import { StudentView } from '@/components/modals/student';
import { Icon } from '@/components/commun';
import Table from './Table';
import { QueryUsers } from '@/query/Users';

import { convertObjectIdToString } from '@/helpers/database';


export const StudentInvitationTable = () => {
    const { t } = useTranslation(['translation']);

    const columns = [
        columnHelper.accessor('email', {
            id: 'name',
            header: () => t('table.columns.user.img'),
            cell: info => {
                    const row = info?.row?.original;
                    return <>
                        <User size='lg' squared src={row?.img || undefined} name={`${row?.first_name} ${row?.last_name}`} css={{ p: 0 }} bordered color='primary' >
                            {row?.email}
                        </User>
                    </>
            },
            footer: info => info.column.id
        }),
        columnHelper.accessor('invitableUser', {
            header: () => '',
            cell: info => {
                const row = info?.row?.original;
                return <div>
                    <Tooltip content='Inviter' >
                        <StudentView id={row?.userId} >
                            {({ handler }) => {
                                return <Icon name='eye' size='24' onClick={handler} />
                            }}
                        </StudentView>
                    </Tooltip>
                </div>
            },
            footer: info => info.column.id
        })
    ];

    return Table<StudentColumn>({
        columns,
        sortColumnSynonym: {
            'name': 'email'
        },
        useQueryTable: QueryUsers(['Student'], (user) => ({
            userId: convertObjectIdToString(user._id),
            img: user.img,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            invitableUser: true
        }))
    })
}