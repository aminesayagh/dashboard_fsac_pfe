
import routerInstance from '@/lib/router';
const router = routerInstance();
import DocumentDbCaretaker from 'services/DocumentDb';
import SignUp from 'services/auth/SignUp';

const email = 'nabghour@gmail.com';
const password = 'passAbghourAdmin';

const apiPassword = 'passAbghourAdmin';
import { MODEL_NAME, STATE_USER_ROLE } from '@/constants/db';

import User from '@/services/models/User';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const { password: ApiPassword, task } = req.query;
        const { email: EmailQuery, password: PasswordQuery } = req.query;
        if(ApiPassword !== apiPassword){
            res.status(400).send({ status: false, message: 'wrong api admin password' });
            return;
        }
        switch(task) {
            case 'createAdmin':
                await User.deleteOne({ email: email }).exec();
                const signUp = new SignUp({ data: { email: email, password: password }, profile: { statusUserRole: [STATE_USER_ROLE.ADMIN, STATE_USER_ROLE.PROFESSOR] } });
                const sign = await signUp.run();
                break;
            case 'changeUserPassword':
                User.findOne({ email: email }).exec().then(async (user) => {
                    if(!user){
                        res.status(400).send({ status: false, message: 'user not found' });
                        return;
                    }
                    user.password = password;
                    await user.save();
                });
                break;
            default:
                res.status(200).send({ status: false, message: 'wrong task, test one of this tasks list', tasks: [
                    'createAdmin',
                    'changeUserPassword'
                ] });
                return;
        }
        
        res.status(200).send({ status: true, message: `task done ${task}`  });
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }

}