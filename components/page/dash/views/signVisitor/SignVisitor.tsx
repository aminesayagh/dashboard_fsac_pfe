// global resources
import React, { useContext } from 'react'

// style
import StyleNameCaretaker from '@/helpers/ClassNameCreator'
import SignVisitorStyle from './SignVisitor.module.scss'
const cg = StyleNameCaretaker(SignVisitorStyle)

import Profile from '@/query/Profile';

import { DialogNotification } from '@/components/dialog';


import { useTranslation } from 'react-i18next';


import { ActiveAngleContext } from '@/context/router/Page';

import { PostVisitor, PostStudent, ImageStudent } from '@/components/forms/user/signProfile';
import { Types } from 'mongoose';
import { IProfile } from '@/types/Auth';

import { useMachine } from '@xstate/react';
import signUpMachine from '@/machine/signUpMachine';
import { assign } from 'xstate';


const SignVisitorMachine = ({ profile }: { profile: IProfile }) => {
    const { t } = useTranslation(['dialog']);
    const { activeAngle, setActiveAngle } = useContext(ActiveAngleContext);

    const [state, send] = useMachine(signUpMachine,
        {
            services: {
                getContextSignUp: async (context) => {
                    const { email, professorDoc, studentDoc, ...profileData } = profile;
                    console.log('profile', profile);
                    const img = profile.img ? profile.img : undefined;
                    if (!studentDoc) {
                        return { profile: profileData, img };
                    }
                    const data = { profile: profileData, student: { 
                        studentNum: studentDoc.studentNum, 
                        cne: studentDoc.cne, 
                        option: studentDoc.option[0]?.name 
                    }, img: profile.img };
                    return { ...data };
                }
            },
            actions: {
                assignContextData: assign((context, event) => {
                    const data = event.data;
                    return { data };
                }),
                assignError: assign((context, event) => {
                    const error = event.data as string;
                    console.error('error', error);
                    return { error };
                }),
                assignProfileData: assign((context, event) => {
                    const data = event.data;
                    return { data: { ...context.data ,profile: data } };
                }),
                assignStudentData: assign((context, event) => {
                    const data = event.data;
                    return { data: { ...context.data, student: data } };
                }),
                assignImgData: assign((context, event) => {
                    const data = event.data;
                    return { data: { ...context.data, img: data } };
                })
            }
        });
    if(state.matches('FAILURE')) {
        return <DialogNotification open={true} type='error' >Please contact the developper</DialogNotification>
    }
    if(state.matches('SUCCESS.VISITOR.NEW')) {
        return <PostVisitor id={profile._id} user={{ ...state.context.data.profile }} send={() => send('UPDATE_PERSONNAL_INFO')} />
    }
    if(state.matches('SUCCESS.VISITOR.PROFILE.STUDENT')) {
        return <PostStudent id={profile._id} send={() => send('UPDATE_STUDENT_INFO')} />
    }
    if(state.matches('SUCCESS.VISITOR.PROFILE.IMG')) {
        return <ImageStudent profile={profile} send={() => send('UPDATE_IMG')} />
    }
    if(state.matches('SUCCESS.VISITOR.PROFILE.TO_VALID')) {
        return <DialogNotification open={true} type='info' mainAction={{
            title: t('validation_accout_by_admin.mainAction'),
            onClick: () => setActiveAngle('profile')
        }} >
            {t('validation_accout_by_admin.description')}
        </DialogNotification>
    }
    return <>
        <DialogNotification open={true} type='error' >Please contact the developper</DialogNotification>
    </>;
}
const SignVisitor = () => {
    return (
        <>
            <Profile render={SignVisitorMachine} />
        </>
    )
}

export default SignVisitor;