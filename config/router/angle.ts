
import { IconNames } from '@/components/commun';
import { ANGLES, ITEMS } from '@/constants/router';
import { ObjectValue } from '@/types/helpers';

export type AngleNames = ObjectValue<typeof ANGLES>;
import { TItemNames } from '@/context/router/Items'
export type { TItemNames }
export type TItem = {
    text: TItemNames,
    icon: IconNames,
    type?: 'error' | 'success' | 'warning' | undefined,
    autoFocus?: boolean
}

export type TMenu = {
    title: string,
    items: TItem[]
}

export type TAngles = {
    name: AngleNames,
    defaultItem?: TItemNames,
    menus?: TMenu[],
}

const Angles: TAngles[] = [
    {
        name: ANGLES.HOME,
    },
    {
        name: ANGLES.PROFESSOR,
    },
    {
        name: ANGLES.PROFILE,
        defaultItem: ITEMS.UPDATE_PROFILE_IMAGE,
        menus: [
            {
                title: 'Edit Profile',
                items: [
                    {
                        text: ITEMS.UPDATE_PROFILE,
                        icon: 'archive'
                    },
                    {
                        text: ITEMS.UPDATE_PASSWORD,
                        icon: 'lockOpen'
                    },
                    {
                        text: ITEMS.UPDATE_PROFILE_IMAGE,
                        icon: 'sadSquint'
                    }
                ]
            }
        ]
    },
    {
        name: ANGLES.PROJECT,
    },
    {
        name: ANGLES.STUDENT,
    },
    {
        name: ANGLES.GROUPE_PFE,
    }
]

export const getAngle = (name: ObjectValue<typeof ANGLES>): TAngles => {
    const res = Angles.find(angle => angle.name == name);
    if (!res) return Angles.find(angle => angle.name == ANGLES.HOME) as TAngles;
    return res;
}

export const getDefaultItem = (name: ObjectValue<typeof ANGLES>): TItemNames => {
    const angle = getAngle(name);
    if (!angle) return;
    return angle.defaultItem || undefined;
}