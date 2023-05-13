// global resources
import React from 'react'

// style
import StyleNameCaretaker from '@/helpers/ClassNameCreator'
import ContainerStyle from './Container.module.scss'
const cg = StyleNameCaretaker(ContainerStyle)

import { Container as ContainerNextUi } from '@nextui-org/react';

const Container = ({ children, ...props }: { children: React.ReactElement } & Partial<React.ComponentPropsWithoutRef<typeof ContainerNextUi>>) => {
    
    return (
        <>
            <ContainerNextUi lg {...cg('container')} {...props} >
                {children}
            </ContainerNextUi>
        </>
    )
}

export default Container;