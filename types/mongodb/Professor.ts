import { Types } from "mongoose";
import { ICredential } from "./Default";


interface Professor {
    user_id: Types.ObjectId;
    office_location: string;
    member_pfe_id: Types.ObjectId[];
    option: Types.ObjectId
}

export type IProfessor = Professor;

export type IProfessorJsonMongodb = IProfessor & ICredential;