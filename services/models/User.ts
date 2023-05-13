import { Schema, model, Document, models } from "mongoose";

import { STATE_USER_ROLE, GENDER, MODEL_NAME } from '@/constants/db';
import { objectElement } from "@/helpers/database";

import { IUserFromJsonMongodb } from "@/types/mongodb/User";
import mongoosePaginate from 'mongoose-paginate-v2';
import { PaginateModel } from "mongoose";

const userSchema = new Schema({
    date: {
        type: Date,
        default: new Date(),
    },
    first_name: {
        type: String,
        required: false,
    },
    last_name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false,
    },
    statusUserRole: {
        type: [String],
        required: true,
        default: [STATE_USER_ROLE.VISITOR],
        enum: objectElement(STATE_USER_ROLE),
    },
    img: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        required: false,
        enum: Object.values(GENDER),
    },
    cin: {
        type: String,
        required: false,
        // unique: true,
    },
    address: {
        type: String,
        required: false,
    },
    email_verified: {
        type: Boolean,
        required: false,
    }
}, {
    strict: true
});

userSchema.virtual('username').get(function(){
    return `${this.first_name} ${this.last_name}`;
});

userSchema.plugin(mongoosePaginate)

export default models?.User || model<IUserFromJsonMongodb & Document>(MODEL_NAME.USER, userSchema);

