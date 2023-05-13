import { STATE_USER_ROLE, UserRole } from '@/constants/db';
import { createColumnHelper } from '@tanstack/react-table';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useTranslation } from 'react-i18next';

import user from '@/lib/api/user';

export type UserColumns = {
    userId: string;
    role: UserRole | UserRole[];
    img?: string;
    first_name?: string;
    last_name?: string;
    email: string;
    validUser?: boolean;
}
const columnHelper = createColumnHelper<UserColumns>()


import { User, Tooltip } from "@nextui-org/react";
import { Badge, Icon } from '@/components/commun';

import { StudentView } from '@/components/modals/student';
import { IUserAuthInFront } from '@/types/mongodb/User';
import { convertObjectIdToString } from '@/helpers/database';

import Table from './Table';
import { Pagination } from '@/types/table';
import { ObjectValue } from '@/types/helpers';
import { QueryUsers } from '@/query/Users';

const serialisationUsers = (users: IUserAuthInFront[]): UserColumns[] => {
    // if (!users) return [];
    return users.map((user) => ({
        userId: convertObjectIdToString(user._id),
        role: user.statusUserRole || [STATE_USER_ROLE.VISITOR],
        img: user.img,
        first_name: user.first_name ?? '',
        last_name: user.last_name ?? '',
        email: user.email,
        validUser: user?.statusUserRole?.includes(STATE_USER_ROLE.VISITOR) ? false : true
    }));
}

export const UserTable = (roles: ObjectValue<typeof STATE_USER_ROLE>[]) => {
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
        columnHelper.accessor('role', {
            id: 'role',
            header: () => t('table.columns.user.role'),
            cell: info => {
                const row = info.row.original;

                return <>
                    <Badge type={row?.role.includes(STATE_USER_ROLE.STUDENT) ? 'success' : row?.validUser ? 'warning' : 'error'}>{row?.role}</Badge>
                </>
            }, footer: info => info.column.id
        }),
        columnHelper.accessor('validUser', {
            header: () => '',
            cell: info => {
                const row = info.row.original;
                return <div className='flex flex-row items-center justify-end'>
                    <Tooltip content='Edit'>
                        <StudentView id={row?.userId} >
                            {({ handler }) => {
                                return <Icon name='Edit' size='24' onClick={handler} />
                            }}
                        </StudentView>
                    </Tooltip>
                </div>
            }
        })
    ];

    return Table<UserColumns>({
        columns,
        sortColumnSynonym: {
            'name': 'email',
            'role': 'statusUserRole',
        },
        useQueryTable: QueryUsers(roles, (user) => ({
            userId: convertObjectIdToString(user._id),
            role: user.statusUserRole || [STATE_USER_ROLE.VISITOR],
            img: user.img,
            first_name: user.first_name ?? '',
            last_name: user.last_name ?? '',
            email: user.email,
            validUser: user?.statusUserRole?.includes(STATE_USER_ROLE.VISITOR) ? false : true
        }))
    })
}

export const useUpdateUsers = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: Partial<IUserAuthInFront>) => {
            const response = await user.putOne({ id, data });
            return response.data;
        },
        onError: (error) => {
            console.log('error', error);
            throw new Error('error');
        },
        onMutate: (newUser) => {
            queryClient.cancelQueries(['users']);
            const oldUsers = queryClient.getQueryData<IUserAuthInFront[]>(['users']);
            // @ts-ignore
            queryClient.setQueryData(['users'], (oldUsers: IUserAuthInFront[] | undefined) => {
                if (!oldUsers) return;
                return oldUsers.map((user) => user._id === newUser._id ? newUser : user);
            });
            return { oldUsers };
        },
        onSettled: () => {
            queryClient.invalidateQueries(['users']);
        }
    });
}