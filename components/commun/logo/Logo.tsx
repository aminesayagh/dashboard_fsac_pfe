import Image from 'next/image';

import StyleNameCaretaker from '@/helpers/ClassNameCreator';
import LogoStyle from './Logo.module.scss';
const cg = StyleNameCaretaker(LogoStyle);

import { useMedia } from '@/hooks';

import { useTranslation } from 'react-i18next';


export default function Logo () {
    const logoText = useMedia<boolean>(['(min-width: 960px)'], [true], false);
    const { t } = useTranslation(['translation']);
    return (
        <>
            <div {...cg('logo', 'container')} >
                <Image src='/image/logo/logo_black_whithout_content.svg' height={70}  width={70} alt={t('identity.logoAlt')}/>
                {logoText && <p >{t('identity.logoName')}</p>}
            </div>
        </>
    )
}