import React, { useState, useEffect } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Avatar from '.';

import addons from '@storybook/addons';
const channel = addons.getChannel();

const srcOptions = {
    'teacher man 1': '/image/avatar/teacher_man_1.png',
    'teacher man 2': '/image/avatar/teacher_man_2.png',
    'teacher woman 1': '/image/avatar/teacher_woman_1.png',
    'teacher woman 2': '/image/avatar/teacher_woman_2.png',
    'student man 1': '/image/avatar/student_man_1.png',
    'student_man_2': '/image/avatar/student_man_2.png',
    'student_woman_1': '/image/avatar/student_woman_1.png',
    'student_woman_2': '/image/avatar/student_woman_2.png'
};

export default {
    title: 'commun/Avatar/default',
    component: Avatar,
    argTypes: {
        src: { name: 'Image', control: 'select', options: srcOptions },
        size: { name: 'Size' ,control: 'select', defaultValue: 'sm', options: ['xs' ,'sm', 'md', 'lg', 'xl', 'max'] },
        name: { name: 'User name', type: { name: 'string', required: false }, defaultValue: 'Noredine' },
        role: { name: 'User role', control: 'select', defaultValue: 'Professor', options: ['Professor', 'Student', 'Admin', 'Visitor'] },
        back: { control: 'select', options: ['light', 'dark'] }
    }
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => {
    return <><Avatar {...args} /></>
}

export const AvatarDefaultImage = Template.bind({});
AvatarDefaultImage.args = {
    src: '/image/avatar/teacher_man_1.png',
    size: 'lg',
    name: 'Noredine',
    role: 'Professor',
    back: 'light'
}