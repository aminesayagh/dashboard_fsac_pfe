import React from "react";
import "styles/globals.scss";

import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";

import { Roboto } from '@next/font/google';
import Providers from '@/context/provider';

const roboto = Roboto({
    subsets: ['cyrillic'],
    variable: '--font-inter',
    weight: ['100', '400', '300', '500', '700', '900']
});
import '@/utils/i18n';



function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {
    return <main className={`${roboto.variable} font-sans`}>
        <Providers session={session} >
            <Component {...pageProps} />
        </Providers>
    </main>
}


export default MyApp;