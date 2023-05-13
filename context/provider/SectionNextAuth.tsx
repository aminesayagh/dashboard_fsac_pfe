import React from "react";

import { SessionProvider, useSession } from 'next-auth/react';

import { useRouter } from "next/router";
import { Loading } from '@/components/commun';
import { RouterPash } from '@/config/router/page';

export default function SectionNextAuth({ children, session }: { children: React.ReactElement, session: any }) {
    return <>
        <SessionProvider session={session} >
            {children}
        </SessionProvider>
    </>
}

export const Auth = ({ children }: { children: React.ReactElement}) => {
    const { status, data } = useSession();
    const router = useRouter();
    if(status == 'loading'){
        return <Loading />
    }
    const page = RouterPash.find((path) => path.page == router.pathname);
    if(!page) {
        console.log('page not found', router.pathname);
        return (<>{children}</>)
    }
    
    if(status == page?.authState) {
        return (<>{children}</>)
    }
    
    router.push(page.redirection);
    return <Loading/>;
}