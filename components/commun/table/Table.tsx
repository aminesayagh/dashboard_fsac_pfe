import { Icon } from 'components/commun';
import { useMemo } from 'react';
export type TTableMode = 'table' | 'card';
import TableStyle from './Table.module.scss';

import { Card } from '@/components/commun';
import { Table } from '@nextui-org/react';
import { Table as TypeTable, flexRender, PaginationState } from '@tanstack/react-table';
import { SetPagination } from 'types/table'

export type LoadingState = 'loading' | 'sorting' | 'loadingMore' | 'error' | 'idle' | 'filtering';


const Header = ({ setMode, mode }: { mode: TTableMode, setMode: React.Dispatch<React.SetStateAction<TTableMode>> }) => {
    return (
        <>
            <div className={TableStyle.container} >
                <div className={TableStyle.right} >
                    <div className={TableStyle.right_mode} >
                        <div className={TableStyle.right_mode_item} onClick={() => setMode('table')} >
                            <Icon name='Table' size='20' /><span>Table</span>
                        </div>
                        <div className={TableStyle.right_mode_item} onClick={() => setMode('card')} >
                            <Icon name='Cards' size='20' /><span>Card</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


interface PropsTable {
    table: TypeTable<any>,
    setPagination: SetPagination;
    loadingState: LoadingState;
    pagination: PaginationState;
    isLoading?: boolean;
}

const TableUi = ({ table, setPagination, pagination, loadingState, isLoading }: PropsTable) => {
    const total = Math.ceil(table.getPageCount());

    return <Card animation='y'>
        <Table aria-label='Exemple table with content' css={{
            height: 'auto',
            minWidth: '100%',
        }} bordered selectionMode='single'  >
            <Table.Header columns={table.getHeaderGroups()[0].headers} >
                {(header) => (
                    <Table.Column key={header.id} >
                        {header.isPlaceholder ? null : (
                            <div className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''} onClick={header.column.getToggleSortingHandler()} >
                                {
                                    flexRender(header.column.columnDef.header, header.getContext())
                                }
                                {{
                                    asc: <Icon name='ArrowBarUp' size='20' />,
                                    desc: <Icon name='ArrowBarDown' size='20' />,
                                }[header.column.getIsSorted() as string] ?? null}
                            </div>
                        )}
                    </Table.Column>
                )}
            </Table.Header>
            <Table.Body items={table.getRowModel().rows} loadingState={loadingState} >
                {(row) => (
                    <Table.Row key={row.id}>
                        {(columnKey) => {
                            const cell = row.getVisibleCells().find(({ id }) => id.includes(columnKey.toString()));
                            if (!cell) return <></>;
                            return (
                                <Table.Cell key={cell.id}>
                                    {
                                        flexRender(cell.column.columnDef.cell, cell.getContext())
                                    }
                                </Table.Cell>
                            )
                        }}
                    </Table.Row>
                )}
            </Table.Body>
            <Table.Pagination shadow noMargin align='center' rowsPerPage={10} total={total} onPageChange={(page) => {
                setPagination((lastPage) => {
                    return {
                        ...lastPage,
                        pageIndex: page,
                    }
                })
            }} />
        </Table>
    </Card>
}

TableUi.Header = Header;
export default TableUi;