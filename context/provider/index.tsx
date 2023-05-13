'use client';
import React from 'react';
import NextUi from './NextUi';
import SessionNextAuth, { Auth } from './SectionNextAuth';
import { ActiveAngleProvider } from '../router/Page';
import ReactQueryProvider from './QueryClient';

import '@/utils/i18n';


export default function Providers({ children, session }: { children: React.ReactElement, session: any }) {
    return <>
        <NextUi>
            <SessionNextAuth session={session}>
                <Auth>
                    <ReactQueryProvider >
                            {children}
                    </ReactQueryProvider>
                </Auth>
            </SessionNextAuth>
        </NextUi>
    </>
}

