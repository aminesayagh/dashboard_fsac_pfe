import { Schema, model, Types, Document, models } from "mongoose";
import { MODEL_NAME, STATE_SUPERVISOR } from "@/constants/db";
import { objectElement } from "@/helpers/database";
import { ISupervisorGroupePfeJsonMongodb } from "@/types/mongodb/SupervisorPfe";

const supervisorPfeSchema = new Schema({
    date: {
        type: Date,
        default: new Date(),
    },
    groupe_pfe_id: {
        type: Schema.Types.ObjectId,
        ref: MODEL_NAME.GROUP_PFE,
        unique: false,
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: MODEL_NAME.USER,
        unique: false,
        required: true,
    },
    statusSupervisor: {
        type: String,
        enum: objectElement(STATE_SUPERVISOR),
        required: true,
        default: STATE_SUPERVISOR.ON_HOLD,
    }
}, {
    strict: true
});

export default models?.SupervisorPfe || model<ISupervisorGroupePfeJsonMongodb & Document>(MODEL_NAME.SUPERVISOR_PFE, supervisorPfeSchema);
