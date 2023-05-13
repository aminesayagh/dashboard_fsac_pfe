import React, { useEffect } from 'react';
import { Radio, RadioGroupProps } from '@nextui-org/react'

import { Control, Controller, FieldErrors, FieldPath } from 'react-hook-form';

import HelperBuilder from '../HelperRender';

import { FormContext, TProvider } from '../FormProvider';

type DefaultTypeObject = { [key: string]: any };
import { useInput } from '@nextui-org/react';

export interface Props<T extends DefaultTypeObject> extends Partial<RadioGroupProps> {
    name: FieldPath<T>,
}

export const RadioLocal = <T extends DefaultTypeObject>({ name, children, defaultValue = '', ...props }: Props<T>) => {

    return (
        <>
            <FormContext.Consumer >
                {({ control, errors, checkError }: TProvider<T>) => {
                    if(!control || !errors) throw new Error('Radio Field has no provided parent');
                    return <HelperBuilder render={(helper) => {
                        return (
                            <Controller
                                control={control}
                                name={name}
                                render={({ field }) => {
                                    return <Radio.Group defaultValue={field.value || `${defaultValue}`} onChange={(e) => {
                                        field.onChange(e)
                                    }} {...props} {...{
                                        helperColor: helper.color,
                                        helperText: helper.text,
                                        status: helper.color,
                                        color: helper.color
                                    }} >
                                        {children}
                                    </Radio.Group>
                                }}
                            />
                        )
                    }} error={errors[name]} checkError={checkError} />
                }}
            </FormContext.Consumer>
            
        </>
    )
}

