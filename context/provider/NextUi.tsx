
// 1. import `NextUIProvider` component
import { NextUIProvider } from '@nextui-org/react';
import React from 'react';


export default function NextUi({ children }: { children: React.ReactNode }) {
    return <>
        <NextUIProvider >
            {children}
        </NextUIProvider>
    </>
}