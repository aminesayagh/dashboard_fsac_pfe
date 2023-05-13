// global resources
import React, { useState } from 'react'
import Image from 'next/image';

// style
import StyleNameCaretaker from '@/helpers/ClassNameCreator'
import ProviderStyle from './Provider.module.scss'
const cg = StyleNameCaretaker(ProviderStyle)

import { Card, Row } from '@/components/commun';

import { useTranslation } from 'react-i18next';

import Google from '@/public/provider/Google.png'

const Provider = ({ id, name, signIn }: { name: string, id: string, signIn: any }) => {
    const { t } = useTranslation(['translation'])
    return (
        <>
            <Card isHoverable isPressable variant='bordered' css={{ p: 2, marginTop: 25 }} onClick={() => signIn(id)}>
                <Card.Body>
                    <Row>
                        <Image {...cg('image')} alt='provider' src={`/provider/${name}.png`} width={25} height={25} />
                        <p {...cg('text')} >
                            {t(`provider.${name}`)}
                        </p>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}

export default Provider;