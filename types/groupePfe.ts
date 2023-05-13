import { IProfile } from './Auth';
import { IGroupePfeJsonMongodb } from './mongodb/GroupPfe';
import { IMemberGroupePfeJsonMongodb } from './mongodb/MemberPfe';
import { ISupervisorGroupePfeJsonMongodb } from './mongodb/SupervisorPfe';

export type IMember = IMemberGroupePfeJsonMongodb;
export type ISupervisor = ISupervisorGroupePfeJsonMongodb;

export interface GroupePfeData {
    groupePfe?: IGroupePfeJsonMongodb[],
    members?: IMember[],
    supervisor?: ISupervisor[]
}
export type ContextData = {profile: IProfile} & GroupePfeData;
