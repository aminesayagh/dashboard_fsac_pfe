import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Loading from '.'

export default {
    title: 'commun/Loading/wait',
    component: Loading,
    
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => {
    return <><Loading /></>
}

export const LoadingDefault = Template.bind({ });
LoadingDefault.args = {
    
}