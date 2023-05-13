import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Card from '.'

export default {
    title: 'commun/Card',
    component: Card,
    argTypes: {
        variant: { name: 'Variant', control: 'select', defaultValue: 'bordered', options: ['bordered', 'flat', 'shadow'] },
        isHoverable: { name: 'Hover Effect', type: 'boolean'  },
        isPressable: { name: 'Press Effect', type: 'boolean' },
        children: { name: 'Content', type: { name: 'string' }},
    }
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = ({ children,...args }) => {
    return (
        <>
            <Card key={`${args.active}`} css={{ mw: '400px' }} {...args}>
                <Card.Body>
                    {children ? children : 'Test Card Validated'} 
                </Card.Body>
            </Card>
        </>
    )
};

export const Primary = Template.bind({})
Primary.args = {
    children: 'Test Card Validated',
    variant: 'bordered',
    active: true,
    isHoverable: true,
    isPressable: true
}