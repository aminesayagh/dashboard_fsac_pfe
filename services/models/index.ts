import { MODEL_NAME } from '@/constants/db';
import GroupePfe from './GroupPfe';
import MemberPfe from './MemberPfe';
import Professor from './Professor';
import Project from './Project';
import Semester from './Semester';
import Student from './Student';
import User from './User';
import Option from './Option';
import SupervisorPfe from './SupervisorPfe';

export { GroupePfe, Option, MemberPfe, SupervisorPfe, Professor, Project, Semester, Student, User };

export const db = {
    [MODEL_NAME.USER]: User,
    [MODEL_NAME.STUDENT]: Student,
    [MODEL_NAME.SEMESTER]: Semester,
    [MODEL_NAME.PROFESSOR]: Professor,
    [MODEL_NAME.GROUP_PFE]: GroupePfe,
    [MODEL_NAME.PROJECT]: Project,
    [MODEL_NAME.MEMBER_PFE]: MemberPfe,
    [MODEL_NAME.SUPERVISOR_PFE]: SupervisorPfe,
    [MODEL_NAME.OPTION]: Option,
};