import { Children, useEffect, useState } from 'react';

import { Card } from '@/components/commun';
import { Pagination } from "@nextui-org/react";
import { SetPagination } from '@/types/table';
import { PaginationState, Table as TypeTable } from '@tanstack/react-table';
import Style from './Table.module.scss';
interface PropsCards<T> {
    pagination: PaginationState;
    setPagination: SetPagination;
    table: TypeTable<T>,
    Children: (value: any & { key: string }) => JSX.Element;
}

function Cards<T extends { id: string }>({ table, pagination, setPagination, Children }: PropsCards<T>) {
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(10);

    useEffect(() => {
        const startPage = (pagination.pageIndex - 1) * pagination.pageSize;
        const endPage = startPage + pagination.pageSize;

        setStart(startPage);
        setEnd(endPage);
    }, [pagination.pageIndex, pagination.pageSize]);

    return <>
        <Card variant='flat' animation='y' className='flex flex-col items-center justify-center' >
            <Card.Body>
                <div className={Style.grid_posts}>
                {table.getRowModel().rows.slice(start, end).map((row, index) => {
                    const user = row.original as T;
                    if (!user) return <></>;
                    return (
                        <>
                            
                            {Children({ ...user, key: user.id })}
                        </>
                    )
                })}
                </div>
            </Card.Body>
            <Card.Footer>
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

export default Cards;