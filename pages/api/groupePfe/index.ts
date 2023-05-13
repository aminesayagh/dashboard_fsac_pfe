
import { OPTION_PFE, STATE_GROUPE_PFE, STATE_MEMBER_PFE, STATE_USER_ROLE } from '@/constants/db';
import { ObjectValue } from '@/types/helpers';
import { NextApiRequest, NextApiResponse } from 'next';

import fs from 'fs'

import DocumentDbCaretaker from 'services/DocumentDb';

import { Professor, Student, SupervisorPfe, MemberPfe, GroupePfe } from '@/services/models'
import { PipelineStage } from 'mongoose';
import { convertStringToObjectId, queryString } from '@/helpers/database';
import { MODEL_NAME } from '@/constants/db';

import dbConfig from '@/db/conf.json'

export type TQueryGet = {
    id: string,
    role: ObjectValue<typeof STATE_USER_ROLE>,
}
export type TQueryPost = {
    id: string,
    option: string
}

import routerInstance from '@/lib/router';
const router = routerInstance();

import { ExtendedNextRequestBody } from '@/types/apiHelpers';
import { findSemester } from '@/helpers/semesterDate';

import { IGroupePfeJsonMongodb } from '@/types/mongodb/GroupPfe';
import { IMemberGroupePfeJsonMongodb } from '@/types/mongodb/MemberPfe';
import { ISupervisorGroupePfe, ISupervisorGroupePfeJsonMongodb } from '@/types/mongodb/SupervisorPfe';
import { IProfile } from '@/types/Auth';

export type IResponseGetGroupePfe = {
    groupePfe?: IGroupePfeJsonMongodb[],
    memberPfe?: IMemberGroupePfeJsonMongodb[],
    supervisorPfe?: ISupervisorGroupePfeJsonMongodb[],
} & IProfile

import { z } from 'zod';

const getGroupePfeQuery = z.object({
    id: z.string(),
    role: z.enum([STATE_USER_ROLE.PROFESSOR, STATE_USER_ROLE.STUDENT, STATE_USER_ROLE.ADMIN]).optional(),
    role0: z.enum([STATE_USER_ROLE.PROFESSOR, STATE_USER_ROLE.STUDENT, STATE_USER_ROLE.ADMIN]).optional(),
    role1: z.enum([STATE_USER_ROLE.PROFESSOR, STATE_USER_ROLE.STUDENT, STATE_USER_ROLE.ADMIN]).optional(),
    role2: z.enum([STATE_USER_ROLE.PROFESSOR, STATE_USER_ROLE.STUDENT, STATE_USER_ROLE.ADMIN]).optional(),
});

const postGroupePfeQuery = z.object({
    id: z.string(),
    option: z.string()
});

const secret = process.env.NEXTAUTH_SECRET

import { getToken } from 'next-auth/jwt';

import { IResponsePostGroupePfe } from 'lib/api/groupePfe';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ req: req, secret: secret })
    if (!token) {
        console.log('No jwt')
        res.status(401).json({ error: 'You are not signed in', data: null });
    } else {
        switch (req.method) {
            case 'GET':
                try {
                    const { id, role0, role1, role2, role } = await getGroupePfeQuery.parseAsync(req.query);

                    const roles = [role0, role1, role2, role].filter(Boolean) as (typeof STATE_USER_ROLE[keyof typeof STATE_USER_ROLE])[];
                    const idObject = convertStringToObjectId(queryString(id));
                    const pipeline: PipelineStage[] = [{ $match: { _id: idObject } }];

                    const userDb = new DocumentDbCaretaker<typeof MODEL_NAME.USER, {
                        supervisor: ISupervisorGroupePfe[],
                        groupePfe: IGroupePfeJsonMongodb[],
                        members: IMemberGroupePfeJsonMongodb[],
                    }>({ modelName: MODEL_NAME.USER });

                    if (roles.includes(STATE_USER_ROLE.PROFESSOR)) {
                        pipeline.push({
                            $lookup: {
                                from: SupervisorPfe.collection.name,
                                localField: "_id",
                                foreignField: "user_id",
                                as: "supervisor",
                            },
                        })
                        pipeline.push({
                            $lookup: {
                                from: GroupePfe.collection.name,
                                localField: 'supervisor.groupe_pfe_id',
                                foreignField: '_id',
                                as: "groupePfe"
                            }
                        })
                        pipeline.push({
                            $lookup: {
                                from: MemberPfe.collection.name,
                                localField: 'groupePfe._id',
                                foreignField: 'groupe_pfe_id',
                                as: "members"
                            }
                        })
                    } else if (roles.includes(STATE_USER_ROLE.STUDENT)) {
                        pipeline.push({
                            $lookup: {
                                from: MemberPfe.collection.name,
                                localField: "_id",
                                foreignField: "user_id",
                                as: "members",
                            },
                        })
                        pipeline.push({
                            $lookup: {
                                from: GroupePfe.collection.name,
                                localField: 'members.groupe_pfe_id',
                                foreignField: '_id',
                                as: "groupePfe"
                            }
                        })
                        pipeline.push({
                            $lookup: {
                                from: SupervisorPfe.collection.name,
                                localField: 'groupePfe.supervisor_member_id',
                                foreignField: '_id',
                                as: "supervisor"
                            }
                        });
                    } else {
                        throw new Error("Role not found")
                    }

                    const profileDoc = (await userDb.aggregate(pipeline)).document;
                    if (!profileDoc) {
                        throw new Error("Profile not found");
                    }

                    const { password, ...profile } = profileDoc;
                    res.status(200).send(profile)
                    return;
                } catch (err) {
                    console.error('Error get groupe pfe', err);
                    res.status(500).send({ message: 'Internal server error' });
                    return;
                }
                break;
            case 'POST':
                try {
                    console.log('post groupe pfe')
                    console.log(req.body)
                    const { id, option } = await postGroupePfeQuery.parseAsync(req.body);

                    // get memberPfe option id from db
                    const optionInstance = new DocumentDbCaretaker<typeof MODEL_NAME.OPTION>({ modelName: MODEL_NAME.OPTION });
                    const optionDoc = (await optionInstance.setQuery({ name: option }).getDocuments()).document;

                    const idObject = convertStringToObjectId(queryString(id));
                    console.log('idObject', idObject, option)
                    const groupPfeInstance = new DocumentDbCaretaker<typeof MODEL_NAME.GROUP_PFE>({ modelName: MODEL_NAME.GROUP_PFE });

                    const student = new DocumentDbCaretaker<typeof MODEL_NAME.STUDENT>({ modelName: MODEL_NAME.STUDENT });
                    const studentInDb = (await student.setQuery({ user_id: idObject }).getDocuments()).document;
                    if(!studentInDb) {
                        throw new Error("Student not found");
                    }

                    const semester = new DocumentDbCaretaker<typeof MODEL_NAME.SEMESTER>({ modelName: MODEL_NAME.SEMESTER });
                    const semesters = (await semester.setQuery({}).getDocuments()).documents;
                    const dateCurrent = new Date();
                    const semesterCurrent = findSemester(dateCurrent, semesters);
                    if (!semesterCurrent) {
                        throw new Error("Semester not found");
                    }
                    console.log('semesterCurrent', semesterCurrent)

                    const countPfeGroupe = (await groupPfeInstance.countDocuments()).count;
                    console.log('countPfeGroupe', countPfeGroupe, optionDoc)
                    const groupPfeDoc = (await groupPfeInstance.setDocument({
                        name: `groupe A: ${countPfeGroupe + 1}`,
                        student_members_id: [],
                        option: optionDoc._id,
                        semester: semesterCurrent._id,
                        statusGroupePfe: STATE_GROUPE_PFE.ON_HOLD,
                    }).insertDocument()).document;


                    const memberPfeInstance = new DocumentDbCaretaker<typeof MODEL_NAME.MEMBER_PFE>({ modelName: MODEL_NAME.MEMBER_PFE });
                    const memberPfeDoc = (await memberPfeInstance.setDocument({ user_id: idObject, groupe_pfe_id: groupPfeDoc._id, statusMemberPfe: STATE_MEMBER_PFE.ADMIN }).insertDocument()).document;

                    await groupPfeInstance.setQuery({ _id: groupPfeDoc._id }).updateDocument({ student_members_id: memberPfeDoc._id });

                    await student.setQuery({ _id: studentInDb._id }).updateDocument({ member_pfe_id: [memberPfeDoc._id, ...(studentInDb.member_pfe_id ? studentInDb.member_pfe_id : [])] });

                    res.status(200).json({ groupePfe: groupPfeDoc, memberPfe: memberPfeDoc } as IResponsePostGroupePfe);
                    return;
                } catch (err) {
                    console.error('Error post groupe pfe', err);
                    res.status(500).send({ message: 'Internal server error' });
                    return;
                }
                break;
        }
    }
}