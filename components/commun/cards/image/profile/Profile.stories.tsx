import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Profile from './Profile'
import { GENDER, STATE_USER_ROLE } from '@/constants/db';

export default {
    title: 'commun/cards/Profile',
    component: Profile
} as ComponentMeta<typeof Profile>

const Template: ComponentStory<typeof Profile> = args => <Profile {...args} />;

export const Primary = Template.bind({ })
Primary.args = {
    profile: {
        img: 'https://res.cloudinary.com/dvxn9nvjs/image/upload/v1675499399/fsac/wv5pv6b81jefzqxmw7os.png',
        statusUserRole: [STATE_USER_ROLE.ADMIN],
        last_name: 'SAYAGH',
        first_name: 'MOHAMED AMINE',
        gender: GENDER.MAN
    }
}