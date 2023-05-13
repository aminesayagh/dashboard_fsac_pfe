import { Types } from 'mongoose';
import { ICredential } from "./Default";

import { OptionPfe } from '@/constants/db';
interface Option {
    name: OptionPfe;
    responsible_option_id?: Types.ObjectId | string; 
}

export type IOption = Option;

export type IOptionCredential = IOption & ICredential;