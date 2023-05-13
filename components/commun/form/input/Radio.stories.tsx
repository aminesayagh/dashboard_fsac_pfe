import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Field } from '@/components/commun';

import FormRender from '../FormRender';
import { object, string } from 'yup';
import { Radio } from '@nextui-org/react';

export default {
    title: 'commun/form/field/radio',
    component: Field.Radio
} as ComponentMeta<typeof Field.Radio>;

interface IFormRender {
    gender: 'man' | 'women'
}

const testRadio = () => object().shape({
    gender: string().required('Gender is required'),
})

const Template: ComponentStory<typeof Field.Radio> = ({ name,...args }) => {
    return (
        <>
            {/* @ts-ignore */}
            <FormRender<IFormRender> yupValidator={testRadio()} onSubmit={() => {}} button={() => {}} >
                <Field.Radio<IFormRender> name='gender' defaultValue='man' {...args} >
                    <Radio size='sm' value='man' >Man</Radio>
                    <Radio size='sm' value='woman' >Women</Radio>
                </Field.Radio>
            </FormRender>
        </>
    )
}

export const Primary = Template.bind({});

Primary.args = {
    
}