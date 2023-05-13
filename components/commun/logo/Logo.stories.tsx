import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import './Logo.module.scss';

import Logo from '.';

export default {
    title: 'commun/Logo',
    component: Logo,
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => {
    return <><Logo /></>;
}

export const LogoDefault = Template.bind({ });
LogoDefault.args = {

}