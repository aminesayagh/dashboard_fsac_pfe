import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import Providers from 'next-auth/providers';
import Email from 'next-auth/providers/email';
import clientPromise from '@/utils/mongodbConnect';

import dbConnect from '@/utils/mongooseConnect';

import type { NextAuthOptions } from 'next-auth'

import axios from 'axios';
import { Types } from 'mongoose';

const URL = process.env.NEXTAUTH_URL;
const SECRET = process.env.NEXTAUTH_SECRET;

dbConnect().then();

import { z } from 'zod'
import { UserRole } from '@/constants/db';
import { signUpErrors } from '@/services/auth/SignUp';
import { signInErrors } from '@/services/auth/SignIn';

export const authBody = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

type AuthValidResponse = {
    id: Types.ObjectId,
    userId: Types.ObjectId,
    email: string,
    role: UserRole
};
export type AuthResponse = AuthValidResponse & { status: true } | {
    status: false,
    error: string
};

export const authErrors = {
    ...signUpErrors,
    ...signInErrors
}

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'login',
            credentials: {
                task: { label: 'Task', type: 'text' },
                email: { label: 'Email', type: 'text', placeholder: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            // @ts-ignore
            async authorize(credentials, req) {
                if (!credentials) throw new Error('No credentials');
                const { task, ...auth } = credentials;
                const validAuth = await authBody.parseAsync(auth);

                try {
                    const { data, status } = await axios.post<AuthResponse>(`${URL}/api/access/${task == 'signin' ? 'signincredential' : 'signupcredential'}`, { ...validAuth });
                    
                    if (status < 400) {
                        if (!!data && data.status) {
                            return { email: data.email, id: data.id, role: data.role, userId: data.userId } as AuthValidResponse;
                        } else if (!data.status) {
                            return Promise.reject(new Error(data.error));
                        }
                    }
                } catch (err) {
                    console.error(err);
                }
                return null;
            }
        }),
        Google({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || '',
        }),
        // Email({
        //     server: process.env.EMAIL_SERVER || '',
        //     from: process.env.EMAIL_FROM || '',
        //     maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
        // }),
    ],
    secret: SECRET,
    adapter: MongoDBAdapter(clientPromise),
    pages: {
        signIn: '/',
        newUser: '/dash',
        error: '/404',
        verifyRequest: 'auth/verify-request'
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60
    },
    jwt: {
        signingKey: SECRET,
    },
    debug: true,
    callbacks: {
        async session({ session, user }) {
            if (user) {
                if (!user.email) throw new Error('No email');
                session.user.email = user.email;
            }

            return session;
        }
    }
} as NextAuthOptions)