import { Types } from 'mongoose'

export type ICredential = {
    _id: Types.ObjectId;
    date: Date;
    __v?: number;
};