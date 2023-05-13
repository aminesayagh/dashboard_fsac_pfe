import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Field } from '@/components/commun';

import FormRender from '../FormRender';
import { object, string } from 'yup';

export default {
    title: 'commun/form/field/Password',
    component: Field.Password
} as ComponentMeta<typeof Field.Password>;

interface IFormRender {
    password: string,
}

const testPassword = () => object().shape({
    password: string().required().min(5).max(40),
})

const Template: ComponentStory<typeof Field.Password> = ({ name, ...args }) => {
    // @ts-ignore
    return <FormRender<IFormRender> yupValidator={testPassword()} onSubmit={() => { }} button={() => { }} >
        <Field.Input<IFormRender> name='password' {...args} />
    </FormRender>
}

export const Primary = Template.bind({});

Primary.args = {
    label: 'Ajouter un password',
    placeholder: "*********"
}