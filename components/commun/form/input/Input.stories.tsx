import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Field } from '@/components/commun';

import FormRender from '../FormRender';
import { object, string } from 'yup';

export default {
    title: 'commun/form/field/Input',
    component: Field.Input
} as ComponentMeta<typeof Field.Input>;

interface IFormRender {
    text: string
}

const testInput = () => object().shape({
    text: string().required('text required')
})

const Template: ComponentStory<typeof Field.Input>= ({ name, ...args}) => {
    // @ts-ignore
    return <FormRender<IFormRender> yupValidator={testInput()} onSubmit={() => {}} button={() => {}} >
        <Field.Input<IFormRender> name='text' {...args} />
    </FormRender>
}

export const Primary = Template.bind({ });

Primary.args = {
    label: 'Ajouter un text',
    placeholder: 'Placeholder text'
}