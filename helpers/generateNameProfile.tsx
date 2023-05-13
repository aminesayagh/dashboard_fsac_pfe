import { IProfile } from 'types/Auth';
import { STATE_USER_ROLE, GENDER } from '@/constants/db';
import { ObjectValue } from '@/types/helpers';

function getFullName({ gender, statusUserRole, last_name, first_name }: Pick<IProfile, 'gender' | 'statusUserRole' | 'last_name' | 'first_name'>) : string {
    let fullName = "";
    if (gender === GENDER.MAN) {
        if (statusUserRole.includes(STATE_USER_ROLE.PROFESSOR)) {
            fullName += "Monsieur ";
        } else if (statusUserRole.includes(STATE_USER_ROLE.STUDENT)) {
            fullName += "Monsieur ";
        } else {
            fullName += "Monsieur ";
        }
    } else if (gender === GENDER.WOMAN) {
        if (statusUserRole.includes(STATE_USER_ROLE.PROFESSOR)) {
            fullName += "Madame ";
        } else if (statusUserRole.includes(STATE_USER_ROLE.STUDENT)) {
            fullName += "Mademoiselle ";
        } else {
            fullName += "Madame ";
        }
    }
    if(first_name && last_name){
        fullName += `${first_name} ${last_name}`;
    }
    return fullName;
}
import { getAvatar } from '@/public/image/avatar';

function getProfileImage(profile: Pick<IProfile, 'gender' | 'statusUserRole' | 'img'> | undefined): string {
    const defaultAvatar = getAvatar(profile?.gender, profile?.statusUserRole).src;
    return (profile?.img !== ''&& !!profile?.img && profile?.img?.includes('http://res.cloudinary.com/')) ? profile.img : defaultAvatar;
  }
export { getFullName, getProfileImage };