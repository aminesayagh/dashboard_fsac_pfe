import React from 'react';
import { Control, FieldErrors } from "react-hook-form";

export interface IFormProvider {
    checkError: boolean,
    control: Control<{}> | null,
    errors: FieldErrors<{}> | null,
}

export type TProvider<T extends {}> = ({ checkError: boolean, control?: Control<T>, errors?: FieldErrors<T> }) 
export const FormContext = React.createContext({ checkError: false });
