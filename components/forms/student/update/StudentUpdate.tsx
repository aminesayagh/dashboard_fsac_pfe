

// global resources
import React from 'react'
import { object, string, number, AnyObjectSchema, ref, mixed } from 'yup';

import { FormRender, TButton } from '@/components/commun/form';

// style
import StyleNameCaretaker from '@/helpers/ClassNameCreator'
import UserStyle from './StudentUpdate.module.scss';
const cg = StyleNameCaretaker(UserStyle);

import { Types } from 'mongoose';

import { useTranslation } from 'react-i18next';

import { OPTION_PFE, OptionPfe } from '@/constants/db';
import { IStudentToUpdate } from "@/types/mongodb/Student";

import { Button, Field } from '@/components/commun';
import { Radio } from '@nextui-org/react';

type StudentUpdate = IStudentToUpdate & {
    option: OptionPfe
};
import { mutationProfile } from "@/query/Profile";


const FormBody = () => {
    const { t } = useTranslation(['form']);

    return (
        <>
            <Field.Input<StudentUpdate> name='cne' label={t('field.cne.label') || ''} placeholder={t('field.cne.placeholder') || ''} />
            <Field.Input<StudentUpdate> name='studentNum' label={t('field.studentNum.label') || ''} placeholder={t('field.studentNum.placeholder') || ''} />
            <Field.Radio<StudentUpdate> name='option' label={t('field.option.label') || ''}>
                <Radio size='sm' value={OPTION_PFE.DATABASE}>{t('field.option.values.database') || ''}</Radio>
                <Radio size='sm' value={OPTION_PFE.RESEAU}>{t('field.option.values.reseau') || ''}</Radio>
                <Radio size='sm' value={OPTION_PFE.SID}>{t('field.option.values.sid') || ''}</Radio>
            </Field.Radio>
        </>
    )
}

const ButtonSubmit: TButton = ({ setCheckError }) => {
    const { t } = useTranslation(['action']);
    return (<><Button.Action type='submit' onClick={() => setCheckError(true)}>{t('action.updateStudentProfile')} </Button.Action></>)
}

const UpdateStudent = ({ defaultValues ,id }: { defaultValues: StudentUpdate  ,id: Types.ObjectId }) => {
    const mutateProfile = mutationProfile();

    const { t } = useTranslation(['form']);

    const postValidator = object().shape({
        cne: string().required(t('error.required') || ''),
        studentNum: number().required(t('error.required') || ''),
        option: mixed().oneOf(Object.values(OPTION_PFE)).required(t('error.required') || '')
    })
    return (
        <>
            <FormRender<StudentUpdate>
                yupValidator={postValidator}
                values={defaultValues}
                onSubmit={(setIsSend, setSendError, setCheckError) => async (allData) => {
                    mutateProfile.mutate({ id: id, student: { ...allData } });
                    setCheckError(false);
                }}
                button={ButtonSubmit}
            >
                <FormBody />
            </FormRender>

        </>
    )

}

export default UpdateStudent;