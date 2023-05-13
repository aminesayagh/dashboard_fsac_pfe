import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Icon from './Icon'

export default {
    title: 'commun/Icons/Icon',
    component: Icon,
    argsTypes: {
        name: { name: 'Name' },
        size: { name: 'Size', type: { name: 'number', required: true } },
        color: {
            control: 'color'
        }
    }
} as ComponentMeta<typeof Icon>

const Template: ComponentStory<typeof Icon> = args => <Icon {...args} />;

export const Primary = Template.bind({})
Primary.args = {
    name: 'User',
    size: 50,
    color: '#000000',
}