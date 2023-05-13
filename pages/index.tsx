import Providers from '@/context/provider';
import { HomeSuspended } from '@/components/page';
import { Head } from '@/components/layout';
import { Header } from '@/components/layout';

import { useTranslation } from 'react-i18next';

import { STATE_USER_ROLE } from '@/constants/db';
import { PAGES } from 'constants/router';

import { AccessComponent } from 'types/Auth';

const Home = ({ }) => {
    const { t } = useTranslation(['translation'])
    return (
        <>
            <Head pageHead={{ title: t('intro.title'), description: t('intro.body') }}>
                <Header>
                    <HomeSuspended />
                </Header>
            </Head>
        </>
    )
}


export default Home;