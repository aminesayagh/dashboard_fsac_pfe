
import AuthUser from './Auth';
import { IUserSignIn, IUserFromJsonMongodbWithoutPassword, IUserProfileWithoutConfidential } from 'types/mongodb/User';
type TResponseMethod = Promise<[boolean, Error | null]>

import bcrypt from 'bcrypt';

interface TSign {
    state: 'ok' | 'failed',
    message: string,
    payload: IUserFromJsonMongodbWithoutPassword
}

export const signUpErrors = {
    'userExist': 'user exist',
    'failedToCreateUser': 'failed to create user',
}

export default class SignUp extends AuthUser<IUserSignIn> {
    _profile: IUserProfileWithoutConfidential;
    constructor({ data, profile }: { data: IUserSignIn; profile: IUserProfileWithoutConfidential }) {
        super(data);
        this._profile = profile;
    }
    public async updateUserProfile(): TResponseMethod {
        if (!this._profile) {
            throw new Error("You don't have any profile to update");
        }
        if (!this._user_exist) {
            throw new Error("You must be logged in to update your profile")
        }
        try {
            await this.setQuery({ _id: this._user_exist._id }).updateDocument({ ...this._profile });
            this._user_exist = { ...this._user_exist, ...this._profile };
            return [true, null];
        } catch (err: any) {
            console.log('error in update user profile', err);
            return [false, err];
        }
    }
    public async addUserToMongodb(): TResponseMethod {
        try {
            if (!this._data) {
                throw new Error('Error add new user to mongodb');
            }
            const newPassword = await this.hashPassword(this._data.password);
            const {email, password, ...other} = this._data;
            this._user_exist = (await this.setDocument({
                email: this._data.email,
                password: newPassword,
                ...this._profile
            }).insertDocument()).document;

            if (!this._user_exist) throw new Error(`Error user not found`);
            return [true, null];
        } catch (err: any) {
            console.log('error in addUserToMongodb', err);
            return [false, err];
        }
    }
    
    public async run(): Promise<[TSign | null, string | null]> {
        try{
            const [userExist, errorUserExist] = await this.verifiedUserExistInMongodb();
            if(errorUserExist) return [null, 'failure verification user already exists'];
            if(userExist) return [null, signUpErrors.userExist]
            if(!userExist){
                const [_, errorAddUser] = await this.addUserToMongodb();
                if(errorAddUser) return [null, signUpErrors.failedToCreateUser];
            }

            if(!this._user_exist) return [null, signUpErrors.failedToCreateUser];

            const { password, ...payload} = this._user_exist;
            return [{
                state: 'ok',
                message: 'User signup successful',
                payload
            }, null];
        }catch(err: any){
            console.log('error in run', err);
            return [null, err];
        }
    }
}