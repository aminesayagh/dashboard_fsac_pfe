// global resources
import React from 'react'

// style
import StyleNameCaretaker from '@/helpers/ClassNameCreator'
import HomeStyle from './Home.module.scss'
const cg = StyleNameCaretaker(HomeStyle)

import { View } from '@/components/layout/dash'
import Profile from '@/query/Profile';
import ViewSignVisitor from '@/components/page/dash/views/signVisitor'
import { STATE_USER_ROLE } from '@/constants/db';

const Home = ({ }) => {

    return (
        <>
            <Profile render={({ profile }) => {
                if (profile.statusUserRole.includes(STATE_USER_ROLE.VISITOR)) {
                    return <ViewSignVisitor />
                }
                return <View.Main>
                    <div {...cg('view', 'dash')} >

                    </div>
                </View.Main>
            }} />
        </>
    )
}

export default Home;