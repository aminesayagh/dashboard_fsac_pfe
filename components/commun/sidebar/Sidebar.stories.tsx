import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Sidebar from './Sidebar';

export default {
    title: 'commun/Sidebar',
    component: Sidebar,

} as ComponentMeta<typeof Sidebar>;

const SidebarComponent: ComponentStory<typeof Sidebar> = (args) => {
    return <div className='w-auto'><Sidebar {...args} /></div>
}

export const SidebarTemplate = SidebarComponent.bind({});
SidebarTemplate.args = {
    menus: [{
        title: 'Title 1',
        items: [
            {
                text: "update profile image",
                icon: 'AlertTriangle'
            },
            {
                text: "update profile",
                icon: 'AlertTriangle',
                autoFocus: true,
            },
            {
                text: "update password",
                icon: 'AlertTriangle',
                type: 'error'
            }
        ]
    }, {
        title: 'Title 2',
        items: [
            {
                text: "update profile image",
                icon: 'AlertTriangle'
            },
            {
                text: "update profile",
                icon: 'AlertTriangle'
            },
            {
                text: "update password",
                icon: 'AlertTriangle',
                type: 'error'
            }
        ]
    }]
}