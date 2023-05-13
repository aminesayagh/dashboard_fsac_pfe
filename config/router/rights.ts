import { MODEL_NAME, STATE_USER_ROLE } from "@/constants/db";
import { ObjectValue } from '@/types/helpers';
import { NAME_BREAKPOINT, PAGES } from '@/constants/router';
import { ITEMS } from '@/constants/router';
import { TRole } from "@/types/mongodb/User";

const { ADMIN, STUDENT, PROFESSOR, VISITOR } = STATE_USER_ROLE;


type IItenRight = {
    name: ObjectValue<typeof ITEMS>,
    access: ObjectValue<typeof STATE_USER_ROLE>[],
}
export const itemsRight: IItenRight[] = [
    {
        name: ITEMS.UPDATE_PROFILE_IMAGE,
        access: [ADMIN, PROFESSOR, STUDENT, VISITOR],
    },
    {
        name: ITEMS.UPDATE_PROFILE,
        access: [ADMIN, PROFESSOR, STUDENT, VISITOR],
    },
    {
        name: ITEMS.UPDATE_PASSWORD,
        access: [ADMIN, PROFESSOR, STUDENT, VISITOR],
    }
]

export const getListItems = (access: TRole) => {
    if(Array.isArray(access)) return itemsRight.filter((item) => access.map(a => item.access.includes(a))).map((item) => item.name);
    return itemsRight.filter((item) => item.access.includes(access)).map((item) => item.name);
}



export const hasAccess = (itemName: ObjectValue<typeof ITEMS> ,access: TRole) => {
    const item = itemsRight.find((item) => item.name === itemName);
    if (!item) return false;
    if(Array.isArray(access)) {
        return item.access.map(v => access.includes(v)).includes(true);
    }
    return item.access.includes(access);
}