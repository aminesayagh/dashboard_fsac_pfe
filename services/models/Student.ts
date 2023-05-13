import { Schema, Types, model, Document, models } from "mongoose";
import { MODEL_NAME } from "constants/db";

import { IStudentJsonMongodb } from 'types/mongodb/Student';

const studentScheme = new Schema({
    date: {
        type: Date,
        default: new Date(),
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: MODEL_NAME.USER,
        index: true,
        required: true,
    },
    studentNum: {
        type: Number,
        required: true,
        index: true,
    },
    cne: {
        type: String,
        index: true,
        unique: true,
        required: false,
    },
    member_pfe_id: [{
        type: Schema.Types.ObjectId,
        required: false,
    }],
    semester_id: [{
        type: Schema.Types.ObjectId,
        required: false,
    }],
    option: {
        type: Schema.Types.ObjectId,
        ref: MODEL_NAME.OPTION,
        required: false,
    }
}, {
    strict: true
});

export default models?.Student || model<IStudentJsonMongodb & Document>(MODEL_NAME.STUDENT, studentScheme);
