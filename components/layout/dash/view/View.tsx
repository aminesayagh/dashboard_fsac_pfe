// global resources
import React, { useContext, useMemo } from 'react'

// style
import StyleNameCaretaker from '@/helpers/ClassNameCreator'
import ViewStyle from './View.module.scss'
const cg = StyleNameCaretaker(ViewStyle)

// const t = trans('view');
import { useTranslation } from 'react-i18next';

import { SideBar } from '@/components/layout';
import { ActiveItemsContext, TItemNames } from '@/context/router/Items';
import { ActiveAngleContext } from '@/context/router/Page';
import { getAngle } from '@/config/router/angle';
import { Grid } from "@nextui-org/react";
import { Card, Col, Row } from '@/components/commun'

import { STATE_USER_ROLE } from '@/constants/db'

// use Profile component to get user role and display the right view
import Profile from '@/query/Profile';

const ViewSidebar = ({ children }: { children: React.ReactElement }) => {
    const { activeAngle } = useContext(ActiveAngleContext);
    const { activeItem, setActiveItem } = useContext(ActiveItemsContext)
    return (
        <>
            <SideBar menus={getAngle(activeAngle).menus} activeItem={activeItem} handleAngle={(value: TItemNames) => () => setActiveItem(value)} >
                {children}
            </SideBar>
        </>
    )
}

const Widgets = () => {
    return (
        <>
            <Card className='flex flex-col w-full'>
                <Card.Body >
                </Card.Body>
            </Card>
        </>
    )
}

const View = ({ children }: { children: React.ReactElement | React.ReactElement[] }) => {
    const { activeAngle } = useContext(ActiveAngleContext);
    const { t } = useTranslation(['translation'])
    return (
        <>

            <div {...cg('view', 'title')} >
                <Profile render={({ profile: { statusUserRole } }) => {
                    const isVisitor = useMemo(() => statusUserRole.includes(STATE_USER_ROLE.VISITOR), [statusUserRole]);
                    return <>
                        <h3 {...cg('title')} >{isVisitor ? t('view.visitor.welcome') : t(`view.${activeAngle}.title`)}</h3>
                    </>
                }} />
                {children}
            </div>
        </>
    )
}

const ViewMain = ({ children }: { children: React.ReactElement }) => {
    return (
        <>
            <Grid.Container gap={2} direction='row' >
                <Grid xs={12} md={8}>
                    {children}
                </Grid>
                <Grid xs={12} md={4} css={{ display: 'flex', flexDirection: 'col' }} direction='column' justify='space-evenly' alignContent='stretch'>
                    <Widgets />
                </Grid>
            </Grid.Container>
        </>
    )
}

View.SideBar = ViewSidebar;
View.Main = ViewMain;
export default View;