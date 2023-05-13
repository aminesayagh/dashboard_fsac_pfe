import React from 'react';
import { NavBar } from '@/components/commun';
import { useSession } from 'next-auth/react';

interface HeaderProps {
    children: React.ReactNode;
}

import { User, Connect } from './user';
import { MenuDashboard } from './menus';
import { STATE_USER_ROLE } from '@/constants/db';

const Header = ({ children }: HeaderProps) => {
    const { status, data } = useSession();
    return <>
        {
            status == 'authenticated' ? <NavBar.Authenticated NavMenu={MenuDashboard} User={User} NavMenuMobile={MenuDashboard.Mobile} /> : 
                <NavBar.Default Actions={Connect} />
        }
        {children}
    </>
}

export default Header;