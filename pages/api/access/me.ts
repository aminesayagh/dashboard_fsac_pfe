
import { MODEL_NAME } from '@/constants/db';
import { NextApiRequest, NextApiResponse } from 'next';
import DocumentDbCaretaker from 'services/DocumentDb';

import { convertStringToObjectId, queryString } from '@/helpers/database';

import routerInstance from '@/lib/router';
const router = routerInstance();

import { StudentSchemaUpdate } from '@/types/mongodb/Student';
import { IProfile, IProfileByRole } from '@/types/Auth';
import { getProfile } from '@/services/getProfile';

import { z } from 'zod';

export const getMeQuery = z.object({
    email: z.string().email(),
});
export const putMeBody = z.object({
    id: z.string(),
    data: z.object({
        value: z.any().optional(),
        student: z.any().optional()
    })
});

export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case 'GET':
                if (getMeQuery.safeParse(req.query).success) {
                    const { email } = await getMeQuery.parseAsync(req.query);
                    const result = await getProfile(email);
                    return res.status(200).send(result);
                }
                return res.status(200).send({ message: 'ok' })
                break;
            case 'PUT':
                const { id, data: { value: userData, student: studentData } } = await putMeBody.parseAsync(req.body);
                const idObject = convertStringToObjectId(queryString(id));

                // import document user by id using mongoose
                const userDb = await new DocumentDbCaretaker<typeof MODEL_NAME.USER>({ modelName: MODEL_NAME.USER }).setQuery({ _id: idObject }).getDocuments();
                const user = userDb.document;
                if (!user) {
                    res.status(400).send({ message: 'user no find' });
                }

                const dataRole: IProfileByRole = {};
                if (!!userData) {
                    // update user data by id with mongoose
                    await userDb.updateDocument(userData);
                }
                if (!!studentData) {
                    // update student data by id with mongoose
                    const studentDb = await new DocumentDbCaretaker<typeof MODEL_NAME.STUDENT>({ modelName: MODEL_NAME.STUDENT }).setQuery({ user_id: user._id }).getDocuments();
                    const student = studentDb.document;

                    // get option by name
                    const optionDb = await new DocumentDbCaretaker<typeof MODEL_NAME.OPTION>({ modelName: MODEL_NAME.OPTION }).setQuery({ name: studentData.option }).getDocuments();
                    const optionOfStudent = optionDb.document;

                    const validNewStudent = await StudentSchemaUpdate.parseAsync(studentData);
                    if (!student) {
                        const newStudentData = (await studentDb.setDocument({ user_id: user._id, ...validNewStudent, option: optionOfStudent._id }).insertDocument()).document;
                        dataRole.studentDoc = { ...newStudentData, option: [optionOfStudent] };
                    } else {
                        const newStudentData = (await studentDb.updateDocument({ ...validNewStudent, option: optionOfStudent._id, user_id: user._id })).document;
                        dataRole.studentDoc = { ...newStudentData, option: [optionOfStudent] };
                    }
                }
                const { password, ...userWithoutPassword } = user;

                res.status(200).json({ ...userWithoutPassword, ...dataRole } as IProfile);
                break;
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: 'Error me server', err })
    }
}