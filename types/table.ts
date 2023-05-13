import { Dispatch, SetStateAction } from "react";
import { PaginationState } from '@tanstack/react-table';

export interface TableDataParams {
    pageIndex: number;
    pageSize: number;
    sortBy: string
}

export interface Pagination {
    new: {page: number, limit: number},
    next?:{page: number, limit: number},
    previous?: {page: number, limit: number},
    startIndex: number,
    endIndex: number,
    total?: number,
}

export type QueryParams = {
    _page?: number;
    _limit?: number;
    _sort?: string;
    q?: string;
}

export type SetPagination = Dispatch<SetStateAction<PaginationState>>

export type TTableMode = 'table' | 'card';
