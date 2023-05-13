export const objectElement = (obj: { [key: string]: any }) => Object.values(obj);

export const ArrType = <T>() => new Array<T>(0);

export function convertToArray <T extends string>(obj: { [key: string]: T }): T[] {
    return Object.keys(obj).map((key) => obj[key]);
}

import { Types } from 'mongoose';

export const convertObjectIdToString = (id: Types.ObjectId | string) => {
    return typeof id == 'string' ? id : String(id);
}

import mongoose from 'mongoose';
export const convertStringToObjectId = (id: string) => {
    return new mongoose.Types.ObjectId(id);
}

export const queryString = (query: string | string[]) => {
    return Array.isArray(query) ? query[0] : query;
}