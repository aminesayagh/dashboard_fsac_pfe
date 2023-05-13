import { default as Profile } from './profile/Profile';
import dynamic from 'next/dynamic';

import { ANGLES } from 'constants/router';
import { ObjectValue } from 'types/helpers';


export const Views = {
    [ANGLES.HOME]: dynamic(() => import('./home')),
    [ANGLES.STUDENT]: dynamic(() => import('./student')),
    [ANGLES.PROFESSOR]: dynamic(() => import('./professor')),
    [ANGLES.PROJECT]: dynamic(() => import('./project')),
    [ANGLES.GROUPE_PFE]: dynamic(() => import('./groupePfe')),
    [ANGLES.PROFILE]: dynamic(() => import('./profile'))
};