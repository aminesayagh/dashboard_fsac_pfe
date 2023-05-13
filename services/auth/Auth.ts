import { IUserAuth, IUserFromJsonMongodb } from 'types/mongodb/User';
import DocumentDb from 'services/DocumentDb';
import { MODEL_NAME } from '@/constants/db';
import bcrypt from "bcrypt";
import { TResponsePasswordChange } from '@/types/Auth';

type TResponseMethod = Promise<[boolean, Error | null]>

export default class User<TUser extends IUserAuth> extends DocumentDb<typeof MODEL_NAME.USER>{
  _data: TUser;
  _user_exist: IUserFromJsonMongodb | null;
  constructor(data: TUser) {
    super({ modelName: MODEL_NAME.USER });
    this._data = data;
    this._user_exist = null;
  }
  public async removeUserInMongodb(): TResponseMethod {
    try {
      await this.setQuery({ _id: this._data._id }).deleteDocument();
      this._user_exist = null;
      return [true, null];
    } catch (err: any) {
      console.log('error remove user in mongodb', err);
      return [false, err];
    }
  }
  public async verifiedUserExistInMongodb(): TResponseMethod {
    try {
      if (!this._data) throw new Error('Error verifying user in mongodb, no data provided')
      this._user_exist = (await this.setQuery({ email: this._data.email }).getDocuments()).document
      return [this._user_exist ? true : false, null]
    } catch (err: any) {
      console.log('error verified User Exist In Mongo db', err);
      return [false, err];
    }
  }
  protected async verifyPassword(): TResponseMethod {
    try {
      if (!this._user_exist) throw new Error(`User not found`);
      const validPassword = await bcrypt.compare(this._data.password, this._user_exist.password);
      if (!validPassword) throw new Error(`Error wrong password`);
      return [validPassword, null];
    } catch (err: any) {
      console.log(err);
      return [false, err];
    }
  }
  protected async hashPassword(newPassword: string): Promise<string> {
    const newPasswordHashed = await bcrypt.hash(newPassword, 10);
    return newPasswordHashed;
  }
  public async updatePassword(newPassword: string): Promise<[TResponsePasswordChange | null, string | null]> {
    try {
      if (!this._user_exist) throw new Error('Error updating password, user not found in MongoDB');
      const [_, error] = await this.verifyPassword();
      if(error) {
        return ['wrong password' as TResponsePasswordChange, null];
      }
      const newPasswordHashed = await this.hashPassword(newPassword);
      await this.setQuery({ _id: this._user_exist._id }).updateDocument({ password: newPasswordHashed });
      return ['password updated', null];
    } catch (err: any) {
      console.log('error updating password in MongoDB', err);
      return [null, err];
    }
  }
}