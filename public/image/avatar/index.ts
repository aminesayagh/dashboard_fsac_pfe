
import { STATE_USER_ROLE, GENDER } from '@/constants/db';
import { TRole } from '@/types/mongodb/User';
import { StaticImageData } from 'next/image';

import { ObjectValue } from 'types/helpers';

import studentMan1 from './student_man_1.png';
import studentMan2 from './student_man_2.png';
import studentWoman1 from './student_woman_1.png';
import studentWoman2 from './student_woman_2.png';
import studentWoman3 from './student_woman_3.png';
import teacherMan1 from './teacher_man_1.png';
import teacherMan2 from './teacher_man_2.png';
import teacherWoman1 from './teacher_woman_1.png';
import teacherWoman2 from './teacher_woman_2.png';

const defaultAvatar = {
    [GENDER.MAN]: [studentMan2],
    [GENDER.WOMAN]: [studentWoman1]
} 
const avatar: {
    [key in ObjectValue<typeof STATE_USER_ROLE>]: {
        [key in ObjectValue<typeof GENDER>]: StaticImageData[]
    }
} = {
    [STATE_USER_ROLE.STUDENT]: {
        [GENDER.MAN]: [studentMan1],
        [GENDER.WOMAN]: [studentWoman2],
    },
    [STATE_USER_ROLE.PROFESSOR]: {
        [GENDER.MAN]: [teacherMan2],
        [GENDER.WOMAN]: [teacherWoman1],
    },
    [STATE_USER_ROLE.ADMIN]: {
        [GENDER.MAN]: [teacherMan1],
        [GENDER.WOMAN]: [teacherWoman2],
    },
    [STATE_USER_ROLE.VISITOR]: defaultAvatar,
}

export function getAvatar(gender: ObjectValue<typeof GENDER> | undefined, userStatusRole: TRole | undefined) : StaticImageData {
    if(!userStatusRole || !gender) {
        return avatar['Professor']['man'][0];
    }
    const role = Array.isArray(userStatusRole) ? userStatusRole[0] : userStatusRole;
    let avatarList = avatar[role][gender];
    if (!avatarList) {
        avatarList = avatar[STATE_USER_ROLE.VISITOR][gender];
    }
    const randomNumber = Math.floor(Math.random() * avatarList.length);
    return avatarList[randomNumber];
}

export default avatar;