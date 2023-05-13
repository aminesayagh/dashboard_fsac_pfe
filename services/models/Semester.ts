import { Schema, model, Document, models } from "mongoose";
import { MODEL_NAME } from "constants/db";

import { ISemesterJsonMongodb } from 'types/mongodb/Semester';
const semesterSchema = new Schema({
    date: {
        type: Date,
        default: new Date(),
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    section_number: {
        type: Number,
        required: true,
        enum: [1, 2],
    },
}, {
    strict: true
});

export default models?.Semester || model<ISemesterJsonMongodb & Document>(MODEL_NAME.SEMESTER, semesterSchema);
