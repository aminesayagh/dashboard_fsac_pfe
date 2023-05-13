// global resources
import React from 'react'

// style
import StyleNameCaretaker from '@/helpers/ClassNameCreator'
import SidebarStyle from './Sidebar.module.scss'
const cg = StyleNameCaretaker(SidebarStyle)

import { Card, Grid, IconNames, Button, Icon, Col } from '@/components/commun';
import { Popover, Tooltip } from '@nextui-org/react';

import { useMedia } from '@/hooks';

import { TItem as TItemSidebar, TItemNames, TMenu as TMenuSidebar } from '@/config/router/angle';

import { hasAccess } from '@/config/router/rights';
import Profile from '@/query/Profile';
import { useTranslation } from 'react-i18next';

const Item = ({ text, icon, type, onClick, autoFocus = false }: { onClick: () => void } & TItemSidebar) => {
    const mobileItem = useMedia<boolean>(['(min-width: 1024px)', '(min-width: 768px)'], [true, false], true);
    const { t } = useTranslation(['translation'])
    // @ts-ignore
    const content: string = t(`itemsSidebar.${text}`) || text;
    return <>{
        mobileItem ?
            <Button.Item 
                autoFocus={autoFocus}
                onClick={onClick}
                color={type}
                icon={<Icon name={icon} size={20} />}
                css={{ paddingLeft: '4rem' }} 
            >
                {content}
            </Button.Item> 
            : <>
                <Tooltip content={content} placement='right' color={type}>
                    <Button.Item
                        autoFocus={autoFocus}
                        color={type || 'primary'}
                        onClick={onClick}
                        auto
                        // css={{ minWidth: 'auto' }}
                        icon={<Icon name={icon} size={24} />} 
                    />
                </Tooltip>
            </>
    }
    </>
}

const Sidebar = ({ menus, onClick }: { menus: TMenuSidebar[], onClick: (item: TItemNames) => () => void }) => {
    const mobileItem = useMedia<boolean>(['(min-width: 640px)'], [true], false);

    return (
        <>
            <Profile render={({ profile }) => {
                return <Card variant='shadow' >
                    <Card.Body>
                        <Grid.Container direction='column' gap={2} justify='space-evenly' >
                            {menus.map((menu, index) => {
                                return <>
                                    <Grid key={index}>
                                        <>
                                            {menu.title && mobileItem && <Col {...cg('title')}>
                                                <h5 {...cg('text')}>{menu.title}</h5>
                                            </Col>}
                                            <Grid.Container css={{ p: 0 }} direction='column' gap={2} justify='space-evenly' >
                                                {menu.items.filter(item => !!item.text && hasAccess(item.text, profile.statusUserRole)).map((item, index) => {
                                                    return <><Grid key={index}>
                                                        <Item autoFocus={item.autoFocus} text={item.text} icon={item.icon} type={item.type} onClick={onClick(item.text)} />
                                                    </Grid></>
                                                })}
                                            </Grid.Container>
                                        </>
                                    </Grid>
                                </>
                            })}
                        </Grid.Container>

                    </Card.Body>
                </Card>
            }} />

        </>
    )
}

export default Sidebar;