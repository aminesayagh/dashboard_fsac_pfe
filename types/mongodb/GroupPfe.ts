import { Types } from "mongoose";
import { ICredential } from "./Default";
import { ObjectValue } from 'types/helpers';
import { STATE_GROUPE_PFE} from '@/constants/db';

interface GroupPfe {
    name: string,
    supervisor_member_id?: Types.ObjectId,
    student_members_id: Types.ObjectId[],
    semester: Types.ObjectId,
    project_id?: Types.ObjectId,
    option: Types.ObjectId,
    statusGroupePfe: ObjectValue<typeof STATE_GROUPE_PFE>,
}

export type IGroupPfe = GroupPfe;

export type IGroupePfeJsonMongodb = IGroupPfe & ICredential;