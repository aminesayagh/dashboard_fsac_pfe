

import { NextApiRequest, NextApiResponse } from 'next';

import { MODEL_NAME } from '@/constants/db';
import SignIn from 'services/auth/SignIn';

import { AuthResponse, authBody } from '../auth/[...nextauth]';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        const { email, password } = await authBody.parseAsync(req.body);
        if(req.method === 'POST') {
            const login = new SignIn({ email, password });
            const [result, error] = await login.run();
            if (!!error || !result) {
                res.status(200).send({ status: false, error } as AuthResponse);
                return;
            }
            res.status(200).send({
                email: result.payload.email, userId: result.payload._id,role: result.payload.statusUserRole, status: true
            } as Omit<AuthResponse, 'id'> );
        } else {
            throw new Error('error login');
        }
    } catch (err) {
        console.log('error post login', err);
        res.status(500).send({ status: false } as AuthResponse)
    }
}