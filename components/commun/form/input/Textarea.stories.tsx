import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Field } from '@/components/commun';

import FormRender from '../FormRender';
import { object, string } from 'yup';

export default {
    title: 'commun/form/field/Textarea',
    component: Field.Textarea,
} as ComponentMeta<typeof Field.Textarea>;

interface IFormRender {
    text: string,
}

const textValidator = () => object().shape({
    text: string().required()
})

const Template: ComponentStory<typeof Field.Textarea> = ({ name, ...args }) => {
    // @ts-ignore
    return <FormRender<IFormRender> yupValidator={textValidator()} onSubmit={() => {}} button={() => {}} >
        <Field.Textarea<IFormRender> name='text' {...args}  />
    </FormRender>
}

export const Primary = Template.bind({})

Primary.args = {
    label: 'Label text',
    placeholder: 'Text area space'
}