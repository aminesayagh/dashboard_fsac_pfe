import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Attractive, Action, Secondary } from '.';


const OptimalButton = ({ children, shadow }: { children: string | React.ReactElement, shadow: boolean }) => <Attractive shadow={shadow} >{children}</Attractive>


export default {
    title: 'commun/Button',
    component: OptimalButton,
    argTypes: {
        children: { name: 'Text', type: {name: 'string', required: true } },
        shadow: { name: 'Shadow', control: 'boolean' }
    }
} as ComponentMeta<typeof OptimalButton>;

const AttractiveButton: ComponentStory<typeof OptimalButton> = ({ children, ...args }) => {
    return <Attractive {...args}>{children}</Attractive>;
}
export const AttractiveTemplate = AttractiveButton.bind({});
AttractiveTemplate.args = {
    children: 'Attractive Button',
    shadow: true,
}


const ActionButton: ComponentStory<typeof Action> = (args) => <Action {...args} />;
export const ActionTemplate = ActionButton.bind({});
ActionTemplate.args = {
    children: 'Action Button',
    shadow: false,
}

const SecondaryButton: ComponentStory<typeof Secondary> = (args) => <Secondary {...args}/>;
export const SecondaryTemplate = SecondaryButton.bind({ });
SecondaryTemplate.args = {
    children: 'Secondary button',
    shadow: false,
}