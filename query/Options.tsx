import React from "react";

import { IOption, IOptionCredential } from '@/types/mongodb/Option';
import { UseReactQuery } from '@/components/render/ReactQueryWrapper';
import { useMutation } from "@tanstack/react-query";

import optionApi, { IPostOption } from '@/lib/api/option';
import { queryClient } from '@/context/provider/QueryClient';

export const mutationOption = () => {
    return useMutation<IOption, any, IPostOption>(({ name }) => optionApi.post({ name }).then(r => r.data), {
        onMutate: async (newOption) => {
            await queryClient.cancelQueries(['option']);
            const previousOption = queryClient.getQueriesData(['option']);
            queryClient.setQueriesData<IOption[]>(['option'], (oldOptions) => {
                if (!oldOptions) return;
                return [...oldOptions, newOption];
            })
            return previousOption;
        },
        onError: (err, newOption, context: any) => {
            console.error('error mutate option',err);
            queryClient.setQueriesData(['option'], context.previousOption);
        },
        onSettled: (newOption) => {
            if (!newOption) return;
            queryClient.invalidateQueries(['option']);
        }
    })
}
const Options = ({ render }: { render: ({ options }: { options: IOptionCredential[] }) => React.ReactElement }) => {
    return (
        <>
            <UseReactQuery<IOptionCredential[]>
                query={{
                    queryKey: ['option'],
                    queryFn: async () => {
                        const { data } = await optionApi.get();
                        return data;
                    }
                }}
            >
                {({ data }) => render({ options: data })}
            </UseReactQuery>
        </>
    )
}

export default Options;