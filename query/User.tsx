import { UseReactQuery } from "@/components/render"
import { IProfile, IStudent } from '@/types/Auth';
import React from 'react';
import userApi, { UserUpdate } from '@/lib/api/user'
import { STATE_USER_ROLE, UserRole } from "@/constants/db";
import { IUserAuth, IUserAuthInFront } from "@/types/mongodb/User";

import { Types } from "mongoose";

import { useMutation, useQueryClient } from '@tanstack/react-query';

export const QueryUser = ({ id, render }: { id: Types.ObjectId | string, render: ({ user }: { user: IProfile }) => React.ReactElement }) => {
    return (
        <UseReactQuery<IProfile> query={{
            queryKey: [`user`, id],
            queryFn: async () => {
                const { data } = await userApi.getOne({ id });
                return data;
            },
            refetchOnWindowFocus: true,
            keepPreviousData: true
        }} >
            {({ data }) => {
                return render({ user: data });
            }}
        </UseReactQuery>
    )
}

export const useMutateUser = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: Partial<IUserAuthInFront>) => {
            const { data: user } = await userApi.putOne({ id, data });
            return user;
        },
        onError: (error) => {
            console.error('error mutate user', error);
        },
        onSettled: () => {
            queryClient.invalidateQueries([`user`, id]);
        },
        onMutate: async (newUser) => {
            await queryClient.cancelQueries([`user`, id]);
            const previousUser = queryClient.getQueryData([`user`, id]);
            queryClient.setQueryData([`user`, id], (oldUser: IUserAuthInFront[] | undefined) => {
                if (!oldUser) return;
                return { ...oldUser, ...newUser };
            });
            return { previousUser };
        }
    })
}