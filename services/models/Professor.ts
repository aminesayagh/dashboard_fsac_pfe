import { Schema, model, Types, Document,models } from "mongoose";

import { MODEL_NAME } from "constants/db";
import { IProfessorJsonMongodb } from "types/mongodb/Professor";

const professorSchema = new Schema({
    date: {
        type: Date,
        default: new Date(),
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: MODEL_NAME.USER,
        unique: true,
        required: true
    },
    office_location: {
        type: String,
        required: false,
    },
    member_pfe_id: [{
        type: Schema.Types.ObjectId,
        ref: MODEL_NAME.MEMBER_PFE,
        unique: false,
        required: false
    }],
    option: {
        type: Schema.Types.ObjectId,
        ref: MODEL_NAME.OPTION,
        required: true,
    }
}, {
    strict: true
});

export default models?.Professor || model<IProfessorJsonMongodb & Document>(MODEL_NAME.PROFESSOR, professorSchema);
