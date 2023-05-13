// global resources
import React from 'react'
import { object, string, InferType, AnyObjectSchema, ref } from 'yup';
// style
import StyleNameCaretaker from '@/helpers/ClassNameCreator'
import UserStyle from './User.module.scss';
const cg = StyleNameCaretaker(UserStyle);

import { Types } from 'mongoose';

import { ObjectValue } from 'types/helpers';
import { STATE_USER_ROLE, GENDER } from '@/constants/db';

import { Button, Field } from '@/components/commun';
import { FormRender, TButton } from '@/components/commun/form';
import { Radio } from '@nextui-org/react';

import { mutationProfile } from "@/query/Profile";
import { useTranslation } from 'react-i18next';

interface UserUpdate {
    last_name: string,
    first_name: string,
    gender: ObjectValue<typeof GENDER>,
    cin: string,
    address: string,
}

const FormBody = ({ defaultValues }:any) => {
    const { t } = useTranslation(['form'])
    return (
        <>
            <Field.Input<UserUpdate> name='last_name' label={t('field.last_name.label') || ''} placeholder={t('field.last_name.placeholder') || ''} />
            <Field.Input<UserUpdate> name='first_name' label={t('field.first_name.label') || ''} placeholder={t('field.first_name.placeholder') || ''} />
            <Field.Radio<UserUpdate> name='gender' label={t('field.gender.label') || ''} defaultValue={defaultValues['gender']}>
                <Radio size='sm' value='man'>{t('field.gender.values.1') || ''}</Radio>
                <Radio size='sm' value='woman'>{t('field.gender.values.2') || ''}</Radio>
            </Field.Radio>
            <Field.Input<UserUpdate> name='cin' label={t('field.cin.label') || ''} placeholder={t('field.cin.placeholder') || ''} />
            <Field.Input<UserUpdate> name='address' label={t('field.address.label') || ''} placeholder={t('field.address.placeholder') || ''} />
        </>
    )
}

const ButtonSubmit: TButton = ({ setCheckError }) => {
    const { t } = useTranslation(['form']);
    return (<><Button.Action  type='submit' onClick={() => setCheckError(true)}>{t('action.updateProfile')}</Button.Action></>)
}

const Update = ({ defaultValues, id }: { defaultValues: UserUpdate, id: Types.ObjectId } ) => {
    const mutateProfile = mutationProfile();
    const { t } = useTranslation(['form'])

    const updateValidator = object().shape({
        last_name: string().required(t('required') || ''),
        first_name: string().required(t('required') || ''),
        gender: string().required(t('required') || ''),
        cin: string().required(t('required') || ''),
        address: string().required(t('required') || ''),
    })

    return (
        <>
            <FormRender<UserUpdate> 
                yupValidator={updateValidator}
                values={defaultValues}
                onSubmit={(setIsSend, setSendError, setCheckError) => async (allData) => {
                    mutateProfile.mutate({ id: id, value: { ...allData } });
                    setCheckError(false);
                }}
                button={ButtonSubmit}
            >
                <FormBody defaultValues={defaultValues} />
            </FormRender>
        </>
    )
}

export default Update;