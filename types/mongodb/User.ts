import { STATE_USER_ROLE, GENDER } from '@/constants/db';
import { ObjectValue } from 'types/helpers';
import { ICredential } from './Default';

interface User {
    first_name?: string;
    last_name?: string;
    email: string;
    password: string;
    statusUserRole: TRole;
    img?: string | undefined;
    gender?: ObjectValue<typeof GENDER>;
    cin?: string;
    address?: string;
}

// I User before by stocked in mongodb
export type IUserLocal = User;

export type IUserToUpdate = Partial<User>
// Interface User with importation of mongodb stock
export type IUserFromJsonMongodb = User & ICredential;

// For this Interface is possible to be in a json of mongodb or in local don't pused to mongodb
export type IUserAuth = Omit<User, 'statusUserRole'> & { statusUserRole?: ObjectValue<typeof STATE_USER_ROLE>[] } & Partial<ICredential>; // Default type of Auth class
export type IUserAuthInFront = Omit<IUserFromJsonMongodb, 'password'>;

// For Login User
export type IUserSignIn = Pick<User, 'email' | 'password'>;

// Interface User with importation of mongodb stock without password, used in local side for security reasons
export type IUserFromJsonMongodbWithoutPassword = Omit<User, 'password'> & ICredential;
export type IUserFromJsonMongodbWithoutPasswordUpdated = Partial<Omit<User, 'password'>> & ICredential;
export type IUserProfileWithoutConfidential = Omit<User, 'email' | 'password'>;

import { z } from "zod";

export const zUserRole = z.array(z.union([
    z.literal(STATE_USER_ROLE.STUDENT),
    z.literal(STATE_USER_ROLE.VISITOR),
    z.literal(STATE_USER_ROLE.ADMIN),
    z.literal(STATE_USER_ROLE.PROFESSOR)
]))

export type TRole = ObjectValue<typeof STATE_USER_ROLE> | ObjectValue<typeof STATE_USER_ROLE>[];