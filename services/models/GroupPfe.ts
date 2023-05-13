import { Schema, model, Types, Document, models } from "mongoose";
import { MODEL_NAME, STATE_GROUPE_PFE } from "@/constants/db";

import { IGroupePfeJsonMongodb } from "types/mongodb/GroupPfe";
import { objectElement } from "@/helpers/database";

const groupPfeSchema = new Schema({
    date: {
        type: Date,
        default: new Date(),
    },
    name: {
        type: String,
        required: true,
    },
    supervisor_member_id: {
        type: 'ObjectId',
        ref: MODEL_NAME.USER,
        required: false
    },
    student_members_id: [{
        type: 'ObjectId',
        ref: MODEL_NAME.USER,
        required: true
    }],
    semester: {
        type: 'ObjectId',
        ref: MODEL_NAME.SEMESTER,
        required: true
    },
    project_id: {
        type: 'ObjectId',
        ref: MODEL_NAME.PROJECT,
        required: false
    },
    option: {
        type: 'ObjectId',
        ref: MODEL_NAME.OPTION,
        required: true,
    },
    statusGroupePfe: {
        type: String,
        enum: objectElement(STATE_GROUPE_PFE),
        required: true,
        default: STATE_GROUPE_PFE.ON_HOLD
    }
}, {
    strict: true
});

export default models?.GroupPfe || model<IGroupePfeJsonMongodb & Document>(MODEL_NAME.GROUP_PFE, groupPfeSchema);