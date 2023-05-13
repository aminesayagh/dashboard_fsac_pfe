import React from 'react';
import { TYPES } from '@/constants/props'
import { ObjectValue } from '@/types/helpers';


export type TProviderMessage = {
    provider: 'notification',
    message: ObjectValue<typeof TYPES>
}

export const MessageContext = React.createContext<TProviderMessage>({ provider: 'notification', message: TYPES.INFO });

export type TProviderCard = {
    provider: 'card',
    size: 'xs' | 'md' | 'xl'
}

export const CardContext = React.createContext<TProviderCard>({ provider: 'card', size: 'xs' });