import Providers from '@/context/provider';
import { DashSuspended } from '@/components/page';
import { Head } from '@/components/layout';
import { Header } from '@/components/layout';


import { Container } from '@/components/commun';

import DashboardProvider from '@/context/dash'

import { useTranslation } from 'react-i18next';

const Dash = () => {
    const { t } = useTranslation(['translation'])
    return (
        <>
            <DashboardProvider>
                <Head pageHead={{ title: t('intro.title'), description: t('intro.body') }}>
                    <Container xl className={'min-h-screen'}>
                        <Header>
                            <DashSuspended />
                        </Header>
                    </Container>
                </Head>
            </DashboardProvider>

        </>
    )
}

export default Dash;