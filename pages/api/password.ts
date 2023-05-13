
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
const secret = process.env.NEXTAUTH_SECRET
import Auth from '@/services/auth/Auth';
import { IUserAuth } from '@/types/mongodb/User';

import { TResponsePasswordChange } from '@/types/Auth';

import routerInstance from '@/lib/router';
const router = routerInstance();
export default async function (req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'PUT':
            const user: Pick<IUserAuth, 'email' | 'password'> & { newPassword: string } = req.body.user;
        
            try{
                const auth = new Auth({
                    email: user.email,
                    password: user.password
                });
                const [isExist, errorExist] = await auth.verifiedUserExistInMongodb();
                if(errorExist) throw new Error(errorExist.message);
                if(!isExist) res.status(200).send({ message: "user don't exist" as TResponsePasswordChange})
                const [responseUpdatePassword, errorUpdatePassword] = await auth.updatePassword(user.newPassword);
                if(errorUpdatePassword) {
                    throw new Error(errorUpdatePassword);
                }
                if(responseUpdatePassword) {
                    res.status(200).send({ message: responseUpdatePassword });
                }
            }catch(err: any){
                console.log(err);
                res.status(400).json({ message: err.message });
            }
            break;
    }
}
