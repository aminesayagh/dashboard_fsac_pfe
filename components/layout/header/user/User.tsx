// global resources
import React, { useState, useContext, useMemo } from 'react'

// style
import StyleNameCaretaker from '@/helpers/ClassNameCreator'
import UserStyle from './User.module.scss'
const cg = StyleNameCaretaker(UserStyle)

import { Button } from '@/components/commun';

import { Navbar, Dropdown, Avatar } from "@nextui-org/react";
import { signOut } from 'next-auth/react';

import { useTranslation } from 'react-i18next'; 

import ModalAuth from '@/components/modals/auth';

export const Connect = () => {
    const { t } = useTranslation(['translation']);

    return (
        <>
            <ModalAuth hasAccount={true}>
                {({ handler }) => (<><Button.Action onClick={handler} color={'primary'}>{t('header.login')}</Button.Action></>)}
            </ModalAuth>
        </>
    )
}

import Profile from '@/query/Profile';
import { ActiveAngleContext } from '@/context/router/Page';
import { getProfileImage } from '@/helpers/generateNameProfile'
import { getFullName } from '@/helpers/generateNameProfile';

export const User = () => {
    const { activeAngle, setActiveAngle } = useContext(ActiveAngleContext);
    const { t } = useTranslation(['translation']);

    return (
        <>
            <Profile render={({ profile }) => {
                return (<>
                    <Dropdown key='nav' placement="bottom-right"  >
                        <Navbar.Item>
                            <Dropdown.Trigger>
                                <Avatar as='button' bordered color='primary' size='md' src={getProfileImage(profile)} />
                            </Dropdown.Trigger>
                        </Navbar.Item>
                        <Dropdown.Menu
                            aria-label="Actions Menu"
                            color='primary'
                            variant="light"
                            onAction={(actionKey) => {
                                switch (actionKey) {
                                    case 'logout':
                                        signOut();
                                        break;
                                    case 'settings':
                                        setActiveAngle('profile')
                                        break;
                                }
                            }}
                        >
                            <Dropdown.Item key='welcome' css={{ height: "$22", paddingTop: 6, paddingBottom: 6 }}>
                                <p {...cg('user', 'att')} >
                                    {t('profile.welcome')}
                                </p>
                                <p {...cg('user', 'value')} >
                                    {getFullName(profile)}
                                </p>
                            </Dropdown.Item>
                            <Dropdown.Item key='profile' css={{ height: "$34", paddingTop: 6, paddingBottom: 6 }}>
                                <p {...cg('user', 'att')} >
                                    {t('profile.signAs')}
                                </p>
                                <p {...cg('user', 'value')} >
                                    {profile?.email}
                                </p>
                            </Dropdown.Item>
                            <Dropdown.Item key="settings" withDivider>
                                {t('profile.profile')}
                            </Dropdown.Item>
                            <Dropdown.Item key="logout" withDivider color="error" css={{ height: '$22', paddingTop: 6, paddingBottom: 6 }}>
                                {t('profile.logOut')}
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </>)
            }} />
        </>
    )
}