import React, { ReactElement, useEffect, useMemo, useState } from 'react'

import { AsyncRenderComponent } from '@/components/render/AsyncRenderComponent';
import { useForm, Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


import { Button, Modal } from '@/components/commun';
import { DialogNotification } from '@/components/dialog';
import { AnyObjectSchema } from 'yup';

import { FormContext, TProvider } from './FormProvider';

export type TButton = ({ setCheckError, isLoading }: { setCheckError: (value: boolean) => void, isLoading: boolean } ) => React.ReactElement;
import { TClassAdd } from 'helpers/ClassNameCreator';

interface Props<T extends {}> {
    onSubmit: (setIsSend: (value: boolean) => void, setSendError: (value: string | null) => void, setCheckError: (value: boolean) => void, setIsLoading: (value: boolean) => void) => (allData: T) => void,
    cg?: TClassAdd,
    yupValidator: AnyObjectSchema,
    values?: T,
    button: TButton,
    children: React.ReactElement
}

// style
import StyleNameCaretaker from '@/helpers/ClassNameCreator'
import FormRenderStyle from './FormRender.module.scss'
const cg = StyleNameCaretaker(FormRenderStyle)

function FormRender<IFormInput extends {}>({ onSubmit, yupValidator, button,children, ...props }: Props<IFormInput>) {
    const formProps = props?.values ? { values: props.values } : {}
    const { handleSubmit, control, formState: { errors }, reset, watch } = useForm<IFormInput>({
        resolver: yupResolver(yupValidator),
        ...formProps
    });

    const [isSend, setIsSend] = useState<boolean>(false);
    const [checkError, setCheckError] = useState<boolean>(false);
    const [sendError, setSendError] = useState<string | null>(null);

    const [isLoading, setIsLoading ] = useState(false);

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit( setIsSend, setSendError, setCheckError, setIsLoading ))}
                noValidate
                {...cg('form' ,'container')}
            >
                <FormContext.Provider value={{ checkError, control, errors } as TProvider<IFormInput>}>
                    {!isSend ? <>
                        {children}
                        <div className='flex flex-col gap-6 mt-6' >
                            {button({ setCheckError, isLoading })}
                            <DialogNotification open={!!sendError} type='error'>{sendError || ''}</DialogNotification>
                        </div>
                    </> : false}
                </FormContext.Provider>

            </form>
        </>
    )
}

export default FormRender;