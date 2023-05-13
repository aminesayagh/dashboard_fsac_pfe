// global resources
import React from 'react'

// style
import StyleNameCaretaker from '@/helpers/ClassNameCreator'
import SideBarStyle from './SideBar.module.scss'
const cg = StyleNameCaretaker(SideBarStyle)

import { TItemNames } from '@/config/router/angle';

import { TMenu as TMenuSidebar } from '@/config/router/angle';

import { Sidebar, Grid } from '@/components/commun';

function SideBarLayout({ menus, handleAngle, activeItem, children }: { menus: TMenuSidebar[] | undefined, handleAngle: (value: TItemNames) => () => void, activeItem: TItemNames, children: React.ReactElement }) {
    if (!menus) {
        return <>{children}</>
    }

    return (
        <>
            <div {...cg('sideBar', ['container'])}>
                <div {...cg('sideBar', 'menu')}>
                    <Sidebar menus={menus} onClick={handleAngle} />
                </div>
                <div {...cg('sideBar', 'content')}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default SideBarLayout;