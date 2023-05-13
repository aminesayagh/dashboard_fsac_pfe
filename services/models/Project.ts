import { Schema, model, Types, Document, models } from "mongoose";
import { MODEL_NAME, STATE_PROJECT } from '@/constants/db';
import { objectElement } from "@/helpers/database";

import { IProjectJsonMongodb } from '@/types/mongodb/Project';

const projectSchema = new Schema({
    date: {
        type: Date,
        default: new Date(),
    },
    groupe_pfe_id: [{
        type: Schema.Types.ObjectId,
        ref: MODEL_NAME.GROUP_PFE,
        unique: true,
        required: true,
    }],
    name: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    statusProject: {
        type: String,
        required: true,
        enum: objectElement(STATE_PROJECT),
        default: STATE_PROJECT.PROPOSED
    },
}, {
    strict: true
})

export default models?.Project || model<IProjectJsonMongodb & Document>(MODEL_NAME.PROJECT, projectSchema);
