import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Button, Field, Icon } from '@/components/commun';

import FormRender from '../FormRender';
import { object } from 'yup';
export default {
    title: 'commun/form/field/File',
    component: Field.File
} as ComponentMeta<typeof Field.File>

interface IFormRender {
    file: any
}

const testFile = () => object().shape({
    file: object()
})

const Template: ComponentStory<typeof Field.File> = ({name ,...args}) => {
    // @ts-ignore
    return <FormRender<IFormRender> yupValidator={testFile()} onSubmit={() => {}} button={() => {}} >
        <Field.File<IFormRender> name='file'  {...args} />
    </FormRender>
};

export const Primary = Template.bind({})

Primary.args = {
    label: 'Ajouter un fichier',
    name: 'file'
}