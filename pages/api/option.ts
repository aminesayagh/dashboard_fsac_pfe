import { MODEL_NAME } from '@/constants/db';

import DocumentDbCaretaker from 'services/DocumentDb';
import { NextApiRequest, NextApiResponse } from 'next';

import routerInstance from '@/lib/router';
const router = routerInstance();

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const db = new DocumentDbCaretaker({ modelName: MODEL_NAME.OPTION });

    switch (req.method) {
        case 'GET':
            try {
                const response = (await db.setQuery({}).getDocuments()).documents;
                return res.status(200).send(response);
            } catch (err) {
                console.log('error get option', err);
                return res.status(500).send(err);
            }
            break;
        case 'POST':
            try {
                const { name } = req.body;
                const response = (await db.setDocument({ name }).insertDocument()).document;
                res.status(200).send(response);
            } catch (err) {
                console.log('error post option', err);
                res.status(500).send(err)
            }
            break;
    }
}