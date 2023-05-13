import AuthUser from './Auth';
import { IUserSignIn, IUserFromJsonMongodbWithoutPassword } from 'types/mongodb/User';
type TResponseMethod = Promise<[boolean, Error | null]>
import bcrypt from "bcrypt";

interface TSign {
    state: 'ok' | 'failed',
    message: string,
    payload: IUserFromJsonMongodbWithoutPassword
}

export const signInErrors = {
    'emailNotFound': 'email not found',
    'wrongPassword': 'wrong password',
    'userNotFound': 'user not found',
}

export default class SignIn extends AuthUser<IUserSignIn> {
    constructor(data: IUserSignIn) {
        super(data);
    }
    public async run(): Promise<[TSign | null, string | null]> {
        try{
            const [userExist, errorUserExist] = await this.verifiedUserExistInMongodb();
            if(errorUserExist || !userExist){
                return [null, signInErrors.userNotFound];
            }
            const [_, errorVerifiedPassword] = await this.verifyPassword();
            if(errorVerifiedPassword) return [null, signInErrors.wrongPassword];
            if(!this._user_exist) return [null, signInErrors.userNotFound]
            const {password,...payload} = this._user_exist;
            return [
                {
                    state: 'ok',
                    message: 'Success Sign in',
                    payload: {...payload}
                }, null
            ]
        }catch(err: any){
            console.log('error in run sign in user',err);
            return [null, err];
        }
    }
}