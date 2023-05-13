import { useRouter } from 'next/router';
import { useEffect, useState, useCallback } from 'react';

import { destroyQuery, hasValue } from '@/helpers/query';

function useQueryState<T extends (string | undefined)>(queryName: string, initState: T, validValues: object) {
    const [state, setState] = useState(initState);
    const router = useRouter();

    const handleStateChange = useCallback((newState: T) => {
        if(newState !== state && !!newState) {
            setState(newState);
            const newQuery = {
                [queryName]: newState
            }
            router.push({
                pathname: router.pathname,
                query: { ...router.query, ...newQuery },
            });
        }
    }, [state, initState, router.asPath]);

    useEffect(() => {
        const { query } = router;
        const queryValue = query[queryName];
        if(!queryValue || queryValue == state) {
            return;
        }
        let validQuery = destroyQuery(queryValue);
        if (hasValue(Object.freeze(validValues), validQuery)) {
            // @ts-ignore
            setState(validQuery);
        }
    }, [router.query[queryName], queryName]);

    return [state, handleStateChange] as const;
}

export default useQueryState;