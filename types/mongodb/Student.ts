import { Types } from "mongoose";
import { ICredential } from "./Default";
import { object, string, number, } from 'yup';
import * as z from 'zod';

import { ObjectIdSchema } from '@/helpers/zod';

const StudentSchema = z.object({
    user_id: ObjectIdSchema,
    member_pfe_id: z.array(ObjectIdSchema).optional(),
    cne: z.string().min(1),
    studentNum: z.number().positive(),
    semester_id: z.array(ObjectIdSchema).optional(),
    option: ObjectIdSchema.optional(),
});

export type IStudent = z.infer<typeof StudentSchema>;

export default StudentSchema;



import { OptionPfe } from '@/constants/db';
import { IOptionCredential } from "./Option";

export type StudentPost = Pick<IStudent, 'cne' | 'studentNum'> & {
    option: OptionPfe
}

export type IStudentJsonMongodb = Omit<IStudent, 'option'> & { option: IOptionCredential[] } & ICredential;
export type IStudentToUpdate = Omit<IStudent, 'user_id' | 'option'> & { option: OptionPfe };

export const validatorStudentUpdate = object().shape({
    cne: string().required(),
    studentNum: number().required(),
    semester_id: object().nullable(),
    option: object().nullable(),
})

export const StudentSchemaUpdate = z.object({
    member_pfe_id: z.array(ObjectIdSchema).optional(),
    cne: z.string().min(1),
    studentNum: z.number().positive(),
    semester_id: z.array(ObjectIdSchema).optional(),
    option: z.string().optional(),
});