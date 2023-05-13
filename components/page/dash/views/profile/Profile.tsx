// global resources
import React, { useContext } from 'react'


import { User, Student } from '@/components/forms'
import ProfileRender from '@/query/Profile';

import { ActiveItemsContext, ActiveItemsProvider } from '@/context/router/Items';
import { ITEMS } from '@/constants/router';
import { IProfile } from '@/types/Auth';
import { Card } from '@/components/commun';
import { DialogNotification } from '@/components/dialog';
import { GENDER, OPTION_PFE, STATE_USER_ROLE } from '@/constants/db';

import { useTranslation } from 'react-i18next';

import { View } from '@/components/layout/dash';
import { Right } from '@/components/render';

import { hasAccess } from '@/config/router/rights';

const ProfileItems = {
    [ITEMS.UPDATE_PROFILE_IMAGE]: ({ profile }: { profile: IProfile }) => {
        return (<><User.Image profile={profile} /></>)
    },
    [ITEMS.UPDATE_PROFILE]: ({ profile }: { profile: IProfile }) => {
        
        return (<>
            <div className='flex flex-col gap-y-12' >
                <User.Update id={profile._id} defaultValues={{
                    last_name: profile?.last_name || '',
                    first_name: profile?.first_name || '',
                    gender: profile?.gender || GENDER.MAN,
                    cin: profile?.cin || '',
                    address: profile?.address || '',
                }} />
                <Right rights={[STATE_USER_ROLE.STUDENT, STATE_USER_ROLE.VISITOR]}>
                    {profile.studentDoc ? <Student.UpdateStudent id={profile._id} defaultValues={{
                        cne: profile.studentDoc?.cne || '',
                        studentNum: profile.studentDoc?.studentNum,
                        option: profile.studentDoc?.option[0]?.name || OPTION_PFE.DATABASE
                    }} /> : <></>}
                </Right>
            </div>
        </>)
    },
    [ITEMS.UPDATE_PASSWORD]: ({ profile }: { profile: IProfile }) => {
        return (<><Right rights={[STATE_USER_ROLE.ADMIN, STATE_USER_ROLE.PROFESSOR, STATE_USER_ROLE.STUDENT, STATE_USER_ROLE.VISITOR]}><User.Password email={profile.email} /></Right></>)
    }
}

const ProfileContent = ({ }) => {
    const { activeItem, setActiveItem } = useContext(ActiveItemsContext);
    const { t } = useTranslation(['translation']);
    return (
        <ProfileRender render={({ profile }) => {
            if (!activeItem) return <></>;
            return <>
                <Card size='md' animation='y' key={activeItem} variant='bordered' >
                    <Card.Header>
                        <h3>{t(`profile.${activeItem}.title`)}</h3>
                    </Card.Header>
                    <Card.Body >
                        {hasAccess(activeItem, profile.statusUserRole) ? React.createElement(ProfileItems[activeItem], { profile }) : <DialogNotification type='error' open={!hasAccess(activeItem, profile.statusUserRole)}>You don't have access to this item</DialogNotification>}
                    </Card.Body>
                </Card>
            </>

        }} />)
}

const Profile = ({ }) => {
    return (
        <>
            <View.SideBar>
                <ProfileContent />
            </View.SideBar>
        </>
    )
}

export default Profile;