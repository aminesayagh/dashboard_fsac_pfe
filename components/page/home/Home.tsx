
// global resources
import React from 'react'

// style
import StyleNameCaretaker from '@/helpers/ClassNameCreator'
import HomeStyle from './Home.module.scss';
const cg = StyleNameCaretaker(HomeStyle)


import { useTranslation } from 'react-i18next';

import { Button } from '@/components/commun';


import ModalAuth from '@/components/modals/auth';

const Home = ({ }) => {
    const { t } = useTranslation(['translation'])
    return (
        <>
            <div {...cg('home', 'intro')} >
                <div {...cg('home', 'content')} >
                    <h1 {...cg('title')} >
                        {t('intro.title')}
                    </h1>
                    <p {...cg('p')} >
                        {t('intro.body')}
                    </p>
                </div>
                <div {...cg('action')} >
                    <ModalAuth hasAccount={true}  >
                        {({ handler }) => (<><Button.Attractive size='lg' onClick={handler}>{t('intro.action')}</Button.Attractive></>)}
                    </ModalAuth>
                    <ModalAuth hasAccount={false} >
                        {({ handler }) => (<><Button.Action size='lg' auto={false} onClick={handler}>{t('intro.actionSecondary')}</Button.Action></>)}
                    </ModalAuth>
                </div>
            </div>
        </>
    )
}

export default Home;