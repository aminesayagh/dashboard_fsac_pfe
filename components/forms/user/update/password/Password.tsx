// global resources
import React from 'react'

// style
import StyleNameCaretaker from '@/helpers/ClassNameCreator'
import PasswordStyle from './Password.module.scss'
const cg = StyleNameCaretaker(PasswordStyle)

import { object, string, ref } from 'yup';

import { useTranslation } from 'react-i18next';


import { password } from '@/config/limit';

import { Button, Field } from '@/components/commun';
import { FormRender, TButton } from '@/components/commun/form';
import fetchServiceApi from '@/helpers/fetchApi';
import { TResponsePasswordChange } from '@/types/Auth';

interface UserUpdate {
    last_password: string,
    new_password: string,
    repeat_new_password: string,
}


const FormBody = () => {
    const { t } = useTranslation(['form']);
    return (
        <>
            <Field.Password name='last_password' label={t('field.last_password.label') || ''} placeholder={t('field.last_password.placeholder') || ''} />
            <Field.Password name='new_password' label={t('field.new_password.label') || ''} placeholder={t('field.new_password.placeholder') || ''} />
            <Field.Password name='repeat_new_password' label={t('field.repeat_new_password.label') || ''} placeholder={t('field.repeat_new_password.placeholder') || ''} />
        </>
    )
}
const ButtonSubmit: TButton = ({ setCheckError }) => {
    const { t } = useTranslation(['form']);
    return (<><Button.Action  type='submit' onClick={() => setCheckError(true)}>{t('action.updatePassword')}</Button.Action></>)
}

const Profile = ({ email }: { email: string }) => {
    const { t } = useTranslation(['form']);

    const updateValidator = object().shape({
        last_password: string().required(t('error.required') || '').min(password.minCara, t('min', { min: password.minCara }) || '').max(password.maxCara, t('error.max', { max: password.maxCara }) || ''),
        new_password: string().required(t('error.required') || '').min(password.minCara, t('min', { min: password.minCara }) || '').max(password.maxCara, t('error.max', { max: password.maxCara }) || ''),
        repeat_new_password: string().oneOf([ref('new_password'), null], t('error.repeatPassword') || ''),
    })

    return (
        <>
            <FormRender<UserUpdate> 
                yupValidator={updateValidator}
                onSubmit={(setIsSend, setSendError) => async (allData) => {
                    try{
                        const { data } = await fetchServiceApi<{ message: TResponsePasswordChange }>('password', 'put', { user: { password: allData.last_password, newPassword: allData.new_password, email: email } } );
                        switch(data.message as TResponsePasswordChange){
                            case "User don't exist":
                                setSendError(t("error.api.UserDontExist"))
                                break;
                            case 'wrong password':
                                setSendError(t("error.api.wrongPassword"));
                                break;
                            case 'password updated':
                                setIsSend(true); 
                                break;
                            default:
                                throw new Error('response unknown of server');
                                break;
                        }

                    }catch(err: any) {
                        console.log(err);
                        setSendError('Error server response');
                    }
                }}
                button={ButtonSubmit}
                cg={cg}
            >
                <FormBody />
            </FormRender>
        </>
    )
}

export default Profile;