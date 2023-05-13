import { STATE_SUPERVISOR } from '@/constants/db';
import { Types } from 'mongoose';
import { ObjectValue } from 'types/helpers';
import { ICredential } from './Default';

interface SupervisorGroupePfe {
    groupe_pfe_id: Types.ObjectId,
    user_id: Types.ObjectId,
    statusSupervisor: ObjectValue<typeof STATE_SUPERVISOR>
}

export type ISupervisorGroupePfe = SupervisorGroupePfe;

export type ISupervisorGroupePfeJsonMongodb = ISupervisorGroupePfe & ICredential;