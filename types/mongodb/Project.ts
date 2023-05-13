import { Types } from "mongoose";
import { STATE_PROJECT } from '@/constants/db';
import { ObjectValue } from 'types/helpers';
import { ICredential } from "./Default";

interface Project {
    groupe_pfe_id: Types.ObjectId[],
    name: string,
    description: string,
    statusProject: ObjectValue<typeof STATE_PROJECT>,
}

export type IProject = Project;

export type IProjectJsonMongodb = IProject & ICredential;