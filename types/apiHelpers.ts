import { NextApiRequest } from 'next';


export interface ExtendedNextRequestBody<Body extends any> extends NextApiRequest {
    body: Body
}