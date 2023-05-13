

import { NextApiResponse } from 'next';

import { STATE_USER_ROLE } from '@/constants/db';
import SignUp from '@/services/auth/SignUp';
import { ExtendedNextRequestBody } from '@/types/apiHelpers';

import { AuthResponse, authBody } from '../auth/[...nextauth]';

export default async function (req: ExtendedNextRequestBody<{ email: string, password: string }>, res: NextApiResponse) {
    try {
        const auth = await authBody.parseAsync(req.body);

        const signUp = new SignUp({ data: { email: auth.email, password: auth.password }, profile: { statusUserRole: [STATE_USER_ROLE.VISITOR] } });
        const [user, error] = await signUp.run();
        if (error) {
            return res.status(200).send({ status: false, error } as AuthResponse);
        }
        if (!!user) {
            res.status(200).send({ status: true, email: user.payload.email, userId: user.payload._id, role: user.payload.statusUserRole } as Omit<AuthResponse, 'id'>);
        }
    } catch (err) {
        console.log('err api sign up', err);
        res.status(500).send({ status: false, error: err } as AuthResponse);
    }
}