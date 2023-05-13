import React from 'react';
import { Textarea, InputProps } from '@nextui-org/react';

import { Control, Controller, FieldErrors, FieldPath } from 'react-hook-form';

import HelperBuilder from '../HelperRender';
import { useInput } from '@nextui-org/react';


type DefaultTypeObject = { [key: string]: any }
import { FormContext, TProvider } from '../FormProvider';

export interface Props<T extends DefaultTypeObject> extends Partial<InputProps> {
    control: Control,
    name: FieldPath<T>,
    errors: FieldErrors<T>,
    checkError: boolean,
}


export const TextareaLocal = <T extends DefaultTypeObject>({ control, name, errors, checkError, ...props }: Props<T>) => {

    return (
        <>
            <FormContext.Consumer >
                {({ control, errors, checkError }: TProvider<T>) => {
                    if (!control || !errors) throw new Error('Textarea Field has no provided parent');
                    return (
                        <HelperBuilder render={(helper) => {
                            return (
                                <Controller
                                    control={control}
                                    name={name}
                                    render={({ field }) => {
                                        return <Textarea
                                            {...props}
                                            defaultValue={props.defaultValue?.toString() || ''}
                                            onChange={(e) => {
                                                field.onChange(e.target.value)
                                            }}
                                            width='100%'
                                            value={field.value}
                                            size='lg'
                                            {...{
                                                helperColor: helper.color,
                                                helperText: helper.text,
                                                status: helper.color,
                                                color: helper.color
                                            }}
                                        />
                                    }}
                                />
                            )
                        }} error={errors[name]} checkError={checkError} />
                    )
                }}
            </FormContext.Consumer>

        </>
    )
}