import { IUserLocal } from "@/types/mongodb/User";
import { object, string, InferType, AnyObjectSchema, ref } from 'yup';
import { Radio } from '@nextui-org/react';
import { FormRender, TButton } from '@/components/commun/form';
import { Button, Field } from '@/components/commun';
import { Types } from 'mongoose';

import { mutationProfile } from "@/query/Profile";

type UserPost = Omit<IUserLocal, 'password' | 'statusUserRole' | 'img' | 'email'>;
import { IProfile } from "@/types/Auth";

import { useTranslation } from 'react-i18next';


const FormBody = () => {
    const { t } = useTranslation(['form']);

    return (
        <>
            <Field.Input<UserPost> name="last_name" label={t('last_name.label') || ''} placeholder={t('last_name.placeholder') || ''} />
            <Field.Input<UserPost> name='first_name' label={t('first_name.label') || ''} placeholder={t('first_name.placeholder') || ''} />
            <Field.Radio<UserPost> name='gender' label={t('gender.label')}>
                <Radio size='sm' value='man'>{t('gender.values.1')}</Radio>
                <Radio size='sm' value='woman'>{t('gender.values.2')}</Radio>
            </Field.Radio>
            <Field.Input<UserPost> name='cin' label={t('cin.label') || ''} placeholder={t('cin.placeholder') || ''} />
            <Field.Input<UserPost> name='address' label={t('address.label') || ''} placeholder={t('address.placeholder') || ''} />
        </>
    )
}

const ButtonSubmit: TButton = ({ setCheckError }) => {
    const { t } = useTranslation(['form']);

    return (<><Button.Action  type='submit' onClick={() => setCheckError(true)}>{t('action.updateProfile')}</Button.Action></>)
}

const Update = ({ id, user, send }: { id: Types.ObjectId,send: () => void, user: Pick<IProfile, 'last_name' | 'first_name' | 'gender' | 'address' | 'cin'> } ) => {
    const mutateProfile = mutationProfile();
    const { t } = useTranslation(['form']);

    const postValidator = object().shape({
        last_name: string().required(t('required') || ''),
        first_name: string().required(t('required') || ''),
        gender: string().required(t('required') || ''),
        cin: string().required(t('required') || ''),
        address: string().required(t('required') || ''),
    })
    return (
        <>
            <FormRender<UserPost> 
                yupValidator={postValidator}
                values={user}
                onSubmit={(setIsSend, setSendError, setCheckError) => async (allData) => {
                    mutateProfile.mutate({ id: id, value: { ...allData } });
                    setCheckError(false);
                    send();
                }}
                button={ButtonSubmit}
            >
                <FormBody />
            </FormRender>
        </>
    )
}

export default Update;