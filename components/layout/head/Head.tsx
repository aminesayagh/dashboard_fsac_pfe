// global resources
import React from 'react'
import { NextSeo } from 'next-seo';
import HeadNext from 'next/head'

import { seoConfig } from 'config/seo'
export type Props = {
    pageHead: {
        title: string,
        description: string,
    }
    children: React.ReactNode
}

const Head = ({ pageHead, children }: Props) => {
    return (<>
        <HeadNext>
            <title>{pageHead.title}</title>
            <meta
                name='viewport'
                content="width=device-width, initial-scale=1, minimum-scale=1"
            />
            <meta name="description" content={pageHead.description} />
            <link rel="icon" href="public/image/logo.svg" />
        </HeadNext>
        <NextSeo 
            title={pageHead.title}
            description={pageHead.description}
            {...seoConfig}
        />
        {children}
    </>)
}
export default Head;