import { Input, InputPasswordProps } from '@nextui-org/react';
import { Control, Controller, FieldPath, FieldErrors } from 'react-hook-form';
import { Icon } from '@/components/commun';

type DefaultTypeObject = { [key: string]: any }

export interface Props<T extends DefaultTypeObject> extends Partial<InputPasswordProps> {
    name: FieldPath<T>,
}
import HelperBuilder from '../HelperRender';
import { FormContext, TProvider } from '../FormProvider';
import { useInput } from '@nextui-org/react';


export function PasswordLocal<T extends DefaultTypeObject>({ name, defaultValue = '', ...props }: Props<T>) {

    return (
        <>
            <FormContext.Consumer>
                {({ control, checkError, errors }: TProvider<T>) => {
                    if (!control || !errors) throw new Error('Password Field has no provided parent');
                    return (
                        <HelperBuilder render={(helper) => {
                            return (
                                <Controller
                                    control={control}
                                    name={name}
                                    render={({ field }) => {
                                        return <Input.Password
                                            {...props}
                                            width='100%'
                                            clearable
                                            size="lg"
                                            initialValue={field.value || `${defaultValue}`}
                                            onChange={(e) => {
                                                field.onChange(e.target.value)
                                            }}
                                            visibleIcon={<Icon name='eye' size={18} />}
                                            hiddenIcon={<Icon name='eyeOff' size={18} />}
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