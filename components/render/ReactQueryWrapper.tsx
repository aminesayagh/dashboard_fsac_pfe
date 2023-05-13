import { useEffect } from 'react';

import { QueryKey, QueryFunction, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { ErrorLoading } from '@/components/commun';

import { DefaultErrorRender, DefaultIsLoadingRender } from '.';

interface QueryParams<T> extends UseQueryOptions<T, unknown> {
    queryKey: QueryKey;
    queryFn: QueryFunction<T>;
}

interface Props<T> {
    query: QueryParams<T>,
    children: ({ data }: { data: T }) => React.ReactNode,
    ErrorRender?: ({ message }: { message: string }) => JSX.Element,
    IsLoadingRender?: () => JSX.Element
}

export function UseReactQuery<T extends unknown>({ query, children, ErrorRender = DefaultErrorRender, IsLoadingRender = DefaultIsLoadingRender }: Props<T>) {
    const { data, isLoading, error, isError } = useQuery<T>(query);

    if (isLoading) return <IsLoadingRender />;
    if (isError) {
        console.log('error react query wrapper', error)
        return <ErrorRender message={error as string} />;
    }

    return <>{children({ data } as { data: T })}</>;
}

