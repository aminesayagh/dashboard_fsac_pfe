
import { NextApiRequest, NextApiResponse } from 'next';

import { MODEL_NAME } from '@/constants/db';
import DocumentDbCaretaker from 'services/DocumentDb';

import { STATE_USER_ROLE } from '@/constants/db';
import { destroyQuery } from '@/helpers/query';

import { getProfile } from '@/services/getProfile';
import { convertStringToObjectId, queryString } from '@/helpers/database';

import User from '@/services/models/User';
async function getUserById(id: string) {
    const db = new DocumentDbCaretaker<typeof MODEL_NAME.USER>({ modelName: MODEL_NAME.USER });
    const idObject = convertStringToObjectId(queryString(id));

    const { email } = (await db.setQuery({ _id: idObject }).getDocuments()).document;
    const result = await getProfile(email);
    return result;
}

async function getUsersByPage(page: number, limit: number, sort: string,roles: (keyof typeof STATE_USER_ROLE)[]) {
    const db = new DocumentDbCaretaker({ modelName: MODEL_NAME.USER });
    const data = (await db.setQuery({
        $or: [
            { statusUserRole: { $elemMatch: { $in: [...roles] } } },
            { statusUserRole: { $in: [...roles] } }
        ]
    }).setPaginate({ page, limit }).setSort(sort).getDocuments());

    const result = data.documents.map((item) => {
        const { password, ...rest } = item;
        return { ...rest };
    });
    const pagination = data.pagination;
    return { data: result, pagination };
}

async function getUser() {
    const db = new DocumentDbCaretaker({ modelName: MODEL_NAME.USER });

    const result = (await db.setQuery({ statusUserRole: [STATE_USER_ROLE.VISITOR, STATE_USER_ROLE.STUDENT] }).getDocuments()).documents;
    return result;
}

import { z } from 'zod';

const getUserByIdSchema = z.object({
    id: z.string()
})
import { zUserRole } from '@/types/mongodb/User';

const getUsersByPageAndLimtSchema = z.object({
    _page: z.string(),
    _limit: z.string(),
    _sort: z.string().optional(),
    roles: zUserRole
})

export default async function (req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            try {
                const { _page, _limit, _sort,id, roles0, roles1, roles2, roles4 } = req.query;
                let data;
                const roles = [roles0, roles1, roles2, roles4].filter((item) => item) as (keyof typeof STATE_USER_ROLE)[];
                if (getUserByIdSchema.safeParse({ id }).success) {
                    data = await getUserById(id as string);
                } else if (getUsersByPageAndLimtSchema.safeParse({ _page, _limit,_sort, roles }).success) {
                    const pageNumber = +(_page as string);
                    const limitNumber = +(_limit as string);
                    const sort = _sort as string;
                    if (!roles) throw new Error('Roles is required');
                    data = await getUsersByPage(pageNumber, limitNumber, sort,roles as (keyof typeof STATE_USER_ROLE)[]);
                } else {
                    data = await getUser();
                }
                return res.status(200).send(data);
            } catch (err) {
                console.log(err);
                return res.status(500).json({ message: 'Internal server error.' });
            }
            break;
        case 'PUT':
            try {
                const { id, data } = req.body;
                const db = new DocumentDbCaretaker<typeof MODEL_NAME.USER>({ modelName: MODEL_NAME.USER });
                const idObject = convertStringToObjectId(queryString(id));
                const result = (await db.setQuery({ _id: idObject }).updateDocument(data)).document;
                return res.status(200).send(result);
            } catch (err) {
                console.log(err);
                return res.status(500).json({ message: 'Internal server error.' });
            }
            break;
    }
}
