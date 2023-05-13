
import { STATE_MEMBER_PFE } from '@/constants/db'
import { Types } from 'mongoose'
import { ObjectValue } from 'types/helpers';
import { ICredential } from './Default';

interface MemberGroupePfe {
    groupe_pfe_id: Types.ObjectId,
    user_id: Types.ObjectId
    statusMemberPfe: ObjectValue<typeof STATE_MEMBER_PFE>,
}

export type IMemberGroupePfe = MemberGroupePfe;

export type IMemberGroupePfeJsonMongodb = MemberGroupePfe & ICredential;