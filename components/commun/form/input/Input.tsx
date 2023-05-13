import React, { useEffect, useMemo } from 'react';
import { Input, InputProps } from '@nextui-org/react';

import { Control, Controller, FieldPath, FieldErrors } from 'react-hook-form';

type DefaultTypeObject = { [key: string]: any }

export interface Props<T extends DefaultTypeObject> extends Partial<InputProps> {
    name: FieldPath<T>,
}
import HelperBuilder from '../HelperRender';
import { FormContext, TProvider } from '../FormProvider';
import { useInput } from '@nextui-org/react';

export function InputLocal<T extends DefaultTypeObject>({ name, defaultValue = '', ...props }: Props<T>) {
    console.log('render input', defaultValue);
    return (
        <>
            <FormContext.Consumer >
                {({ control, errors, checkError }: TProvider<T>) => {
                    if (!control || !errors) throw new Error('Input Field has no provided parent');
                    return (
                        <HelperBuilder render={(helper) => {
                            return (
                                <Controller
                                    control={control}
                                    name={name}
                                    render={({ field }) => {
                                        return <Input
                                            width='100%'
                                            clearable
                                            size="lg"
                                            initialValue={field.value || `${defaultValue}`}
                                            onChange={(e) => {
                                                field.onChange(e.target.value)
                                            }}
                                            {...{
                                                helperColor: helper.color,
                                                helperText: helper.text,
                                                status: helper.color,
                                                color: helper.color
                                            }}
                                            {...props}
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