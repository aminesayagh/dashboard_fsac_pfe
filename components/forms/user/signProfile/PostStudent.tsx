import { mutationProfile } from "@/query/Profile";
import { Button, Field } from '@/components/commun';
import { FormRender, TButton } from '@/components/commun/form';
import { number, object, string, mixed } from 'yup';

import { IStudentToUpdate } from "@/types/mongodb/Student";
import { OPTION_PFE } from '@/constants/db';
import { Radio } from '@nextui-org/react';

import { Types } from 'mongoose';

import { useTranslation } from "react-i18next";

type StudentPost = IStudentToUpdate



const ButtonSubmit: TButton = ({ setCheckError }) => {
    const { t } = useTranslation(['form']);
    return (<><Button.Action  type='submit' onClick={() => setCheckError(true)}>{t('action.updateStudentProfile')} </Button.Action></>)
}

const FormBody = () => {
    const { t } = useTranslation(['form']);

    return (
        <>
            <Field.Input<StudentPost> name='cne' label={t('field.cne.label') || ''} placeholder={t('field.cne.placeholder') || ''} />
            <Field.Input<StudentPost> type='number' name='studentNum' label={t('field.studentNum.label') || ''} placeholder={t('field.studentNum.placeholder') || ''} />
            <Field.Radio<StudentPost> name='option' label={t('option.label')} placeholder={t('field.option.placeholder') || ''}>
                <Radio size='sm' value={OPTION_PFE.DATABASE}>{t('field.option.values.database')}</Radio>
                <Radio size='sm' value={OPTION_PFE.RESEAU}>{t('field.option.values.reseau')}</Radio>
                <Radio size='sm' value={OPTION_PFE.SID}>{t('field.option.values.sid')}</Radio>
            </Field.Radio>
        </>
    )
}

const PostStudent = ({ id, send }: { id: Types.ObjectId, send: () => void }) => {
    const mutateProfile = mutationProfile();
    const { t } = useTranslation(['form']);

    const postValidator = object().shape({
        cne: string().required(t('error.required') || ''),
        studentNum: number().required(t('error.required') || ''),
        option: mixed().oneOf(Object.values(OPTION_PFE)).required(t('error.required') || ''),
    })
    return (<>
        <FormRender<StudentPost> 
            yupValidator={postValidator}
            onSubmit={(setIsSend, setSendError, setCheckError) => async (allData) => {
                mutateProfile.mutate({ id: id, student: { ...allData } });
                setCheckError(false);
                send();
            }}
            button={ButtonSubmit}
        >
            <FormBody />
        </FormRender>
    </>)
}

export default PostStudent;