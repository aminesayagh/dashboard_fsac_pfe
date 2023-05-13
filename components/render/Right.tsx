import { STATE_USER_ROLE } from '@/constants/db';
import { ObjectValue } from '@/types/helpers';
import React from 'react';

type TProps = {
    rights: ObjectValue<typeof STATE_USER_ROLE>[],
    children: React.ReactElement
}

import Profile from '@/query/Profile';

const Right = ({ rights ,children }: TProps) => {
    return <Profile render={({ profile }) => {
        if(!profile.statusUserRole) throw new Error('No status user role');
        const hasRoleAccess = rights.map((right) => Array.isArray(profile.statusUserRole) ? profile.statusUserRole.includes(right) : profile.statusUserRole == right).includes(true);
        if(!hasRoleAccess) return <></>;
        return children;
    }}/>
}

export default Right;