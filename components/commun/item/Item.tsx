// global resources
import React, { useState } from 'react'
import { useHover } from 'react-aria';

// style
import StyleNameCaretaker from '@/helpers/ClassNameCreator'
import ItemStyle from './Item.module.scss'
const cg = StyleNameCaretaker(ItemStyle);

import Card, { Col, Row } from '@/components/commun/card';
import { Icon, IconNames } from '@/components/commun';
import { useTheme } from '@nextui-org/react';
import { The_Girl_Next_Door } from '@next/font/google';


interface Props {
    itemIcon: IconNames,
    itemText: string,
    onClick: () => void,
    isActive: boolean
}

const ItemButton = ({ itemIcon, itemText, isActive, onClick }: Props) => {
    const { theme } = useTheme();

    return (
        <>
            <Card onClick={onClick} isHoverable variant='bordered' isPressable>
                <Card.Header>
                    <Row>
                        <Col css={{ w: 'fit-content' }} span={1}>
                            <Icon name={itemIcon} size='24' color={isActive ? theme?.colors.primary.value : '#444444'} />
                        </Col>
                        <Col>
                            <p {...cg('item')} style={{ color: isActive ? theme?.colors.primary.value : '#444444' }} >
                                {itemText}
                            </p>
                        </Col>
                    </Row>
                </Card.Header>
            </Card>
        </>
    )
}

const ItemOption = ({ children }: { children: React.ReactElement | string }) => {
    return (
        <>
            <Card variant='bordered' width='auto' css={{ w: 'max-content' }} >
                <p {...cg('option')}>{children}</p>
            </Card>
        </>
    )
}
const Item = () => <></>;
Item.Button = ItemButton;
Item.Option = ItemOption;

export default Item;