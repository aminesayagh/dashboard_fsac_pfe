import { MODEL_NAME } from "constants/db";
import { IGroupPfe } from './GroupPfe';
import { IProfessor } from './Professor';
import { IProject } from './Project';
import { ISemester } from './Semester';
import { IStudent } from './Student';
import { IUserLocal } from './User';
import { IOption } from "./Option";
import { IMemberGroupePfe } from './MemberPfe';
import { ISupervisorGroupePfe } from "./SupervisorPfe";

export type { ICredential } from './Default';

export interface TypeDocuments {
    [MODEL_NAME.USER]: IUserLocal,
    [MODEL_NAME.STUDENT]: IStudent,
    [MODEL_NAME.SEMESTER]: ISemester,
    [MODEL_NAME.PROFESSOR]: IProfessor,
    [MODEL_NAME.GROUP_PFE]: IGroupPfe,
    [MODEL_NAME.PROJECT]: IProject,
    [MODEL_NAME.MEMBER_PFE]: IMemberGroupePfe,
    [MODEL_NAME.SUPERVISOR_PFE]: ISupervisorGroupePfe,
    [MODEL_NAME.OPTION]: IOption
}