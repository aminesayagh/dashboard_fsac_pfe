// global resources
import React from 'react'

// style
import StyleNameCaretaker from '@/helpers/ClassNameCreator'
import AvatarProfileStyle from './AvatarProfile.module.scss'
const cg = StyleNameCaretaker(AvatarProfileStyle)

import { Avatar, Row, Col } from '@nextui-org/react';
import Profile from '@/query/Profile';

import { getFullName } from '@/helpers/generateNameProfile';

const AvatarProfile = () => {

    return (
        <>
            <Profile render={({ profile }) => {
                return (<Row>
                    <Col>
                        <Avatar src={profile.img || ''} />
                    </Col>
                    <Col>
                        <p {...cg('name')} >
                            {getFullName(profile)}
                        </p>
                        <p {...cg('profession')} >
                            {profile.statusUserRole}
                        </p>
                    </Col>
                </Row>)
            }} />

        </>
    )
}



export default AvatarProfile;