import { Navbar, NavbarProps } from '@nextui-org/react';
import { Logo } from '@/components/commun';
import React from 'react';

import { STATE_USER_ROLE } from '@/constants/db';
import { ObjectValue } from '@/types/helpers';
import { NextAuthHeader } from 'next-auth/core';
import { NextAuthOptions, Session } from 'next-auth';

interface Props extends NavbarProps {
    Actions: () => React.ReactElement,
}

export const Default = ({ variant = 'floating', Actions }: Props) => {
    return (
        <>
            <Navbar isBordered variant={variant}>
                <Navbar.Brand>
                    <Logo />
                </Navbar.Brand>
                <Navbar.Content>
                    <Actions />
                </Navbar.Content>
            </Navbar>
        </>
    )
}

interface PropsAuthenticated extends NavbarProps {
    NavMenu: () => React.ReactElement,
    User: (() => React.ReactElement) | null,
    NavMenuMobile: () => React.ReactElement,
}

export const Authenticated = ({ variant = 'floating', NavMenu, NavMenuMobile, User }: PropsAuthenticated) => {
    return (
        <>
            <Navbar isBordered variant={variant} css={{ zIndex: 999 }}>
                <Navbar.Toggle aria-label="toggle navigation" showIn="xs" />
                <Navbar.Brand>
                    <Logo />
                </Navbar.Brand>
                <Navbar.Content
                    enableCursorHighlight
                    activeColor="primary"
                    hideIn="xs"
                    variant="underline"
                >
                    <NavMenu />
                </Navbar.Content>
                <Navbar.Content>
                    {User && <User />}
                </Navbar.Content>
                <Navbar.Collapse >
                    <NavMenuMobile />
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}