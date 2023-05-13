// global resources
import React, { useState, useEffect } from 'react'

import { Right } from '@/components/render';

import { STATE_USER_ROLE } from '@/constants/db';

import { UserTable, UserColumns } from '@/table/User';
import { Card, Row, Table } from '@/components/commun';

import Style from './Student.module.scss';

import { Pagination } from "@nextui-org/react";
import { StudentView } from '@/components/modals/student';

import { TTableMode } from '@/types/table';

const StudentTable = () => {
    const [mode, setMode] = useState<TTableMode>('table');
    const { table, isLoading, setPagination, pagination, isFetching, error, isError } = UserTable([STATE_USER_ROLE.STUDENT, STATE_USER_ROLE.VISITOR]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(10);

    useEffect(() => {
        const startPage = (pagination.pageIndex - 1) * pagination.pageSize;
        const endPage = startPage + pagination.pageSize;

        setStart(startPage);
        setEnd(endPage);
    }, [pagination.pageIndex, pagination.pageSize])

    return <>
        <Table.Header setMode={setMode} mode={mode} />
        {mode == 'table' ? 
            <Table table={table} setPagination={setPagination} pagination={pagination} isLoading={isLoading} loadingState={isError ? 'error' : (isLoading || isFetching)? 'loading' : 'idle'} /> : 
            <>
                <Card variant="flat" animation='y' className='flex flex-col items-center justify-center'>
                    <Card.Body  >
                        <div className={Style.grid_posts} >
                            {table.getRowModel().rows.slice(start, end).map((row) => {
                                const user = row.original as UserColumns;
                                if (!user) return <></>;
                                return (
                                    <>
                                        <StudentView id={user.userId}>
                                            {({ handler }) => {
                                                return <Card onPress={handler} isPressable isHoverable >
                                                    <Card.Body css={{ p: 0, m: 0 }} >
                                                        <Card.Image
                                                            src={user.img || ''}
                                                            objectFit='cover'
                                                            width='100%'
                                                            height={300}
                                                            alt={`image profile ${user.last_name} ${user.first_name}`}
                                                        />
                                                    </Card.Body>
                                                    <Card.Footer>
                                                        <div>
                                                            <Row wrap='wrap' justify='space-between' align='center' >
                                                                <span>{user.last_name} {user.first_name}</span>
                                                            </Row>
                                                            <Row wrap='wrap' justify='space-between' align='center' >
                                                                <span>{user.email}</span>
                                                            </Row>
                                                        </div>
                                                    </Card.Footer>
                                                </Card>
                                            }}
                                        </StudentView>
                                    </>
                                )
                            })}
                        </div>
                    </Card.Body>
                    <Card.Footer >
                        <div className='flex flex-row justify-center w-full item-center'>
                            <Pagination shadow noMargin page={pagination.pageIndex} total={Math.ceil(table.getPageCount())} onChange={(page) => {
                                setPagination((lastPage) => ({
                                    ...lastPage,
                                    pageIndex: page
                                }))
                            }} />
                        </div>
                    </Card.Footer>
                </Card>
            </>
        }
    </>
}

const Student = ({ }) => {

    return (
        <>
            <Right rights={[STATE_USER_ROLE.ADMIN, STATE_USER_ROLE.PROFESSOR]}>
                <StudentTable />
            </Right>
        </>
    )
}

export default Student;