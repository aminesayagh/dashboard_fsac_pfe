import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Item from './Item';

export default {
    title: 'commun/Item',
    component: Item.Button
} as ComponentMeta<typeof Item.Button>;

const Template: ComponentStory<typeof Item.Button> = (args) => {
    return <><Item.Button {...args} /></>
}

export const ItemDefault = Template.bind({});
ItemDefault.args = {
    itemIcon: 'MoodSadSquint',
    itemText: 'Test item'
}

export const ItemActive = Template.bind({ });
ItemActive.args = {
    itemIcon: 'MoodSadSquint',
    itemText: "Test item",
    isActive: true
}