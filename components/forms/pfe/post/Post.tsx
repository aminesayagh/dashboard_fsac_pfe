// global resources
import React from 'react'

import { useTranslation } from 'react-i18next';
import { CardAction } from '@/components/commun/cards';
import { DialogTask } from '@/components/dialog'

import { postGroupePfe } from '@/query/GroupePfes';
import { Types } from 'mongoose';
import { OptionPfe } from '@/constants/db';

const Post = ({ id, option, handler }: { id: Types.ObjectId | undefined, option: OptionPfe | undefined, handler: () => Promise<void> }) => {
    const { t } = useTranslation(['dialog']);
    
    return (
        <>
            <DialogTask title={t('add_groupe_pfe.title')} desc={t('add_groupe_pfe.description')} mainAction={{
                name: t('add_groupe_pfe.mainAction'),
                handler
            }} />
        </>
    )
}

export default Post;