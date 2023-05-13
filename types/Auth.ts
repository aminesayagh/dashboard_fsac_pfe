import { STATE_USER_ROLE } from "@/constants/db"
import { PAGES } from 'constants/router';

import { ObjectValue } from './helpers';

export interface AccessComponent {
    access: ObjectValue<typeof STATE_USER_ROLE>[],
    redirect: ObjectValue<typeof PAGES>
}

import { IUserFromJsonMongodbWithoutPassword, IUserFromJsonMongodbWithoutPasswordUpdated } from '@/types/mongodb/User';
import { IProfessorJsonMongodb } from '@/types/mongodb/Professor';
import { IStudentJsonMongodb } from '@/types/mongodb/Student';
import { IMemberGroupePfe, IMemberGroupePfeJsonMongodb } from "./mongodb/MemberPfe";
import { IGroupePfeJsonMongodb } from "./mongodb/GroupPfe";

export type IProfileByRole = {
    professorDoc?: IProfessorJsonMongodb;
    studentDoc?: IStudentJsonMongodb;
}
export type IProfile = IUserFromJsonMongodbWithoutPassword & IProfileByRole;
export type IProfileUpdate = IUserFromJsonMongodbWithoutPasswordUpdated & Partial<IProfessorJsonMongodb> & Partial<IStudentJsonMongodb>;

export type authStatus = "authenticated" | "loading" | "unauthenticated"

export type TResponsePasswordChange = "User don't exist" | 'wrong password' | 'password updated'

export type IStudent = { user: IUserFromJsonMongodbWithoutPassword, student: IStudentJsonMongodb, members: IMemberGroupePfeJsonMongodb[], groupePfe: IGroupePfeJsonMongodb };