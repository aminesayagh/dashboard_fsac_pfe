// global resources
import React, { useContext } from 'react'

// style
import StyleNameCaretaker from '@/helpers/ClassNameCreator'
import MenuStyle from './Menu.module.scss'
const cg = StyleNameCaretaker(MenuStyle)

import { Navbar, Link } from '@nextui-org/react';


import { useTranslation } from 'react-i18next';

import { ActiveAngleContext } from '@/context/router/Page';
import { ANGLES } from '@/constants/router';
import Right from '@/components/render/Right';
import { STATE_USER_ROLE } from '@/constants/db'

const { ADMIN, VISITOR, PROFESSOR, STUDENT } = STATE_USER_ROLE;

const Dashboard = () => {
    const { activeAngle, setActiveAngle } = useContext(ActiveAngleContext);
    const { t } = useTranslation(['translation'])
    return (
        <>
            <Right rights={[ADMIN]}><Navbar.Link isActive={activeAngle == ANGLES.HOME} onClick={() => setActiveAngle(ANGLES.HOME)}>{t('menu.dash.' + ANGLES.HOME)}</Navbar.Link></Right>
            <Right rights={[ADMIN, PROFESSOR]}><Navbar.Link isActive={activeAngle == ANGLES.STUDENT} onClick={() => setActiveAngle(ANGLES.STUDENT)}>{t('menu.dash.' + ANGLES.STUDENT)}</Navbar.Link></Right>
            <Right rights={[ADMIN, STUDENT, PROFESSOR]}><Navbar.Link isActive={activeAngle == ANGLES.PROFESSOR} onClick={() => setActiveAngle(ANGLES.PROFESSOR)}>{t('menu.dash.' + ANGLES.PROFESSOR)}</Navbar.Link></Right>
            <Right rights={[ADMIN, PROFESSOR]}><Navbar.Link isActive={activeAngle == ANGLES.PROJECT} onClick={() => setActiveAngle(ANGLES.PROJECT)}>{t('menu.dash.' + ANGLES.PROJECT)}</Navbar.Link></Right>
            <Right rights={[ADMIN, STUDENT, PROFESSOR]}><Navbar.Link isActive={activeAngle == ANGLES.GROUPE_PFE} onClick={() => setActiveAngle(ANGLES.GROUPE_PFE)}>{t('menu.dash.' + ANGLES.GROUPE_PFE)}</Navbar.Link></Right>
        </>
    )
}

const DashboardMobile = () => {
    const { activeAngle, setActiveAngle } = useContext(ActiveAngleContext);
    const { t } = useTranslation(['translation'])

    return (
        <>
            {[{name: ANGLES.HOME, right: [ADMIN]},{name:ANGLES.STUDENT, right: [ADMIN, STUDENT, PROFESSOR]}, {name: ANGLES.PROFESSOR, right: [ADMIN, STUDENT, PROFESSOR]}, {name: ANGLES.PROJECT, right: [ADMIN, PROFESSOR]}, {name: ANGLES.GROUPE_PFE, right: [ADMIN, STUDENT, PROFESSOR]}].map(({ name, right}, index) => {
                return <>
                    <Right key={index} rights={right}><Navbar.CollapseItem key={name} activeColor='primary' isActive={activeAngle == name} >
                        <Link color='inherit' css={{
                            minWidth: "100%",
                        }} onClick={() => setActiveAngle(name)} >
                            {t(`menu.dash.${name}`)}
                        </Link>
                    </Navbar.CollapseItem></Right>
                </>
            })}
        </>
    )
}

Dashboard.Mobile = DashboardMobile;

export default Dashboard;