import { Schema, model, Types ,Document, models} from "mongoose";

import { ObjectValue } from 'types/helpers';
import { MODEL_NAME, OPTION_PFE } from '@/constants/db';
import { objectElement } from '@/helpers/database';

import { IOptionCredential } from "types/mongodb/Option";

const optionSchema = new Schema({
    date: {
        type: Date,
        default: new Date()
    }, 
    name: {
        type: String,
        enum: objectElement(OPTION_PFE),
        required: true,
    },
    responsible_option_id: {
        type: 'ObjectId',
        ref: MODEL_NAME.USER,
        // unique: true,
        nullable: true,
        required: false,
    }
}, {
    strict: true
})

export default models?.Option || model<IOptionCredential & Document>(MODEL_NAME.OPTION, optionSchema);
