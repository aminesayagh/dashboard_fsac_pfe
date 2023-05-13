import { PipelineStage } from 'mongoose';
import { IProfile } from '@/types/Auth';
import { Professor, Student, Option } from '@/services/models';

import { IProfessorJsonMongodb } from '@/types/mongodb/Professor';
import { IStudentJsonMongodb } from '@/types/mongodb/Student';
import DocumentDbCaretaker from 'services/DocumentDb';
import { MODEL_NAME } from '@/constants/db';
import { STATE_USER_ROLE } from '@/constants/db';

export const getProfile = async (email: string): Promise<IProfile> => {
    
    const userDb = new DocumentDbCaretaker<typeof MODEL_NAME.USER, {
        professorData?: IProfessorJsonMongodb[],
        studentData?: IStudentJsonMongodb[]
    }>({ modelName: MODEL_NAME.USER });

    const user = (await userDb.setQuery({ email }).getDocuments()).document;

    const pipeline: PipelineStage[] = [{ $match: { _id: user._id } }];
    if (user.statusUserRole.includes(STATE_USER_ROLE.PROFESSOR)) {
        pipeline.push({
            $lookup: {
                from: Professor.collection.name,
                localField: '_id',
                foreignField: 'user_id',
                as: 'professorData'
            }
        })
    } else if (user.statusUserRole.includes(STATE_USER_ROLE.STUDENT)  || user.statusUserRole.includes(STATE_USER_ROLE.VISITOR)) {
        pipeline.push({
            $lookup: {
                from: Student.collection.name,
                localField: '_id',
                foreignField: 'user_id',
                as: 'studentData'
            }
        });

        pipeline.push({
            $unwind: {
                path: '$studentData',
                preserveNullAndEmptyArrays: true
            }
        });

        pipeline.push({
            $lookup: {
                from: Option.collection.name,
                localField: 'studentData.option',
                foreignField: '_id',
                as: 'studentData.option'
            }
        });

        pipeline.push({
            $addFields: {
                'option': {
                    $arrayElemAt: ['$studentData.option', 0]
                }
            }
        });
    }
    const profileDoc = (await userDb.aggregate(pipeline)).document;
    
    if (!profileDoc) {
        throw new Error("Profile not found");
    }

    const { password, studentData, professorData, ...profileData } = profileDoc;
    return {
        ...profileData,
        professorDoc: !!professorData ? professorData : undefined,
        studentDoc: !!studentData ? studentData : undefined
    } as IProfile
}