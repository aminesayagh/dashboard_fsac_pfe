import { useState, useEffect, useMemo, useRef, Dispatch, SetStateAction, useReducer } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, SortingState, ColumnDef, getPaginationRowModel, getFilteredRowModel, PaginationState } from '@tanstack/react-table';
import { UseQueryResult } from '@tanstack/react-query';
import { Pagination } from '@/types/table';

// reducer function
interface State<T> {
    data: T[];
    pageSize: number;
    pageNumber: number;
    totalItems: number;
}
type Action<T> =
    | { type: 'init', total: number | undefined }
    | { type: 'setPageSize', size: number }
    | { type: 'setPageNumber', number: number }
    | { type: 'setDataByPage', data: T[] };

function reducerTable<T extends {}>(state: State<T>, action: Action<T>): State<T> {
    switch (action.type) {
        case 'init':
            if(!action.total) return state;
            return { ...state, totalItems: action.total, data: new Array(action.total) };
        case 'setPageSize':
            return { ...state, pageSize: action.size };
        case 'setPageNumber':
            return { ...state, pageNumber: action.number };
        case 'setDataByPage':
            if (state.totalItems === 0) return state;
            const startIdx = (state.pageNumber - 1) * state.pageSize;
            const newData = [...state.data];
            newData.splice(startIdx, state.pageSize, ...action.data);
            return { ...state, data: newData };
        default:
            return state;
    }
}

interface TableProps<T extends {}> {
    columns: ColumnDef<T, string | boolean | any>[];
    sortColumnSynonym: Record<string, string>;
    useQueryTable: ({ pageIndex, pageSize, sortedBy }: { pageIndex: number, pageSize: number, sortedBy: string }) => UseQueryResult<{ data: T[], pagination: Pagination }, any>;
}

export default function Table<T extends {}>({ columns, sortColumnSynonym, useQueryTable }: TableProps<T>) {

    // SORTING 
    const [sorting, setSorting] = useState<SortingState>([]);
    const [sortedBy, setSortedBy] = useState<string>('');
    // pagination
    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 1, pageSize: 10 });

    useEffect(() => {
        setSortedBy(sorting.map(({ id, desc }) => Object.keys(sortColumnSynonym).includes(id) ? `${sortColumnSynonym[id as keyof typeof sortColumnSynonym]}${desc ? ':desc' : ''}` : '').join(','))
    }, [sorting]);

    const { data, isLoading, error, isFetching, isError } = useQueryTable({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        sortedBy,
    });

    const [state, dispatch] = useReducer(reducerTable, {
        data: [],
        pageSize: 10,
        pageNumber: 1,
        totalItems: 0,
    });

    useEffect(() => {
        dispatch({ type: 'init', total: data?.pagination.total });
    }, [data?.pagination.total]);

    useEffect(() => {
        dispatch({ type: 'setPageNumber', number: pagination.pageIndex });
    }, [pagination.pageIndex]);

    useEffect(() => {
        dispatch({ type: 'setPageSize', size: pagination.pageSize });
    }, [pagination.pageSize]);

    useEffect(() => {
        if (data?.data) {
            dispatch({ type: 'setDataByPage', data: data.data });
        }
    }, [data?.data]);

    const table = useReactTable<T>({
        data: state.data as T[],
        columns,
        state: {
            sorting,
            pagination,
        },
        manualSorting: true,
        manualPagination: true,
        pageCount: Math.ceil((data?.pagination.total || 0) / pagination.pageSize),
        // table change
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        // sorting change
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
    });

    return { table, isLoading, isFetching, setPagination, pagination, error, isError } as const;
}