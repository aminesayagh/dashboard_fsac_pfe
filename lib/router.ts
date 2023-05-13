import nextConnect from 'next-connect';
import next, { NextApiRequest, NextApiResponse } from 'next/types';
import { ZodError } from 'zod';
import { NextHandler } from 'next-connect';

const secret = process.env.NEXTAUTH_SECRET
import { getToken } from 'next-auth/jwt';

const routerInstance = nextConnect<NextApiRequest, NextApiResponse>({
    onError: (err, _req, res) => {
        if (err instanceof ZodError)
            res.status(400).json({
                message: 'stems invalid! Please check the data entered.',
                error: err.flatten(),
            });
        else
            res
                .status(500)
                .json({ message: "An error.", error: err });
    },
    onNoMatch: (req, res) => {
        res.status(405).json({
            message: `Method ${req.method} no allowed.`,
            error: 'No allowed.',
        });
    },
});

const authToken = async (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    const token = await getToken({ req: req, secret: secret })
    if (!token) {
        console.log('No jwt')
        res.status(401).json({ error: 'You are not signed in', data: null });
    } else {
        console.log('jwt', token, req.method, req.url)
        return next();
    }
}

export default function router() {
    return routerInstance.use(authToken);
};