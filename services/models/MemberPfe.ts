import { Schema, model, Types, Document, models } from "mongoose";

import { STATE_MEMBER_PFE, MODEL_NAME } from '@/constants/db';
import { objectElement } from "helpers/database";

import { IMemberGroupePfeJsonMongodb } from '@/types/mongodb/MemberPfe'

const memberGroupePfeSchema = new Schema({
    date: {
        type: Date,
        default: new Date(),
    },
    groupe_pfe_id: {
        type: 'ObjectId',
        ref: MODEL_NAME.GROUP_PFE,
        unique: false,
        required: true
    },
    user_id: {
        type: 'ObjectId',
        ref: MODEL_NAME.USER,
        unique: false,
        required: true
    },
    statusMemberPfe: {
        type: String,
        required: true,
        enum: objectElement(STATE_MEMBER_PFE),
        default: STATE_MEMBER_PFE.ON_HOLD
    },
}, {
    strict: true
});

export default models?.MemberPfe || model<IMemberGroupePfeJsonMongodb & Document>(MODEL_NAME.MEMBER_PFE, memberGroupePfeSchema);