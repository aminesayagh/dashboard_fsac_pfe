// global resources
import React, { use } from 'react'
import { object, string, ref } from 'yup';

import { signIn } from "next-auth/react";

import { FormRender, TButton } from '@/components/commun/form';
import { password } from '@/config/limit';
import { Button, Field } from '@/components/commun';

import { useTranslation } from 'react-i18next';

// 1
interface FormAuth {
    email: string,
    password: string,
    repeatPassword: string,
}




const ButtonSubmit: TButton = ({ isLoading, setCheckError }) => {
    const { t } = useTranslation(['form']);
    return (<><Button.Action type='submit' isLoading={isLoading} onClick={() => setCheckError(true)}>{t('action.register')}</Button.Action></>)
}

const FormBody = () => {
    const { t } = useTranslation(['form']);
    return (
        <>
            <Field.Input<FormAuth> name='email' label={t('field.email.label') || ''} placeholder={t('field.email.placeholder') || ''} />
            <Field.Password<FormAuth> type="password" name='password' label={t('field.password.label') || ''} placeholder={t('field.password.placeholder') || ''} />
            <Field.Password<FormAuth> type="password" name='repeatPassword' label={t('field.repeatPassword.label') || ''} placeholder={t('field.repeatPassword.placeholder') || ''} />
        </>
    )
}


const Auth = () => {
    const { t } = useTranslation(['form']);
    const authValidator = object().shape({
        email: string().email(t('error.email') || '').required(t('error.required') || ''),
        password: string().required(t('error.required') || '').min(password.minCara, t('error.min', { min: password.minCara }) || '').max(password.maxCara, t('max', { max: password.maxCara }) || ''),
        repeatPassword: string().required().oneOf([ref('password'), null], t('repeatPassword') || ''),
    })
    return (
        <>
            <FormRender<FormAuth>
                yupValidator={authValidator}
                onSubmit={(setIsSend, setSendError, setCheckError, setIsLoading) => async (allData) => {
                    setIsLoading(true);
                    try {
                        const result = await signIn('credentials', {
                            redirect: false,
                            task: 'signup',
                            email: allData.email,
                            password: allData.password
                        });
                        if (!result) {
                            setIsSend(false);
                            setSendError(t('error.api.responseUndefined'));
                        } else if (!!result.error) {
                            setIsSend(false);

                            setSendError(t(`error.${result?.error}`));
                        } else {
                            setIsSend(true);
                        }
                        setCheckError(false);

                    } catch (err) {
                        console.error(err);
                        setSendError('Error server');
                    }
                    setIsLoading(false);
                }}
                button={ButtonSubmit}
            >
                <FormBody />
            </FormRender>
        </>
    )
}

export default Auth;