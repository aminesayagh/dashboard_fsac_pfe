import React, { ReactNode, HTMLProps } from 'react';
import { animations } from './animations';
import { CardProps, CardFooterVariantsProps } from '@nextui-org/react';
export type AnimationNames = keyof typeof animations;
import { Card as CardNext, Col as ColNext, Row as RowNext, Grid as GridNext } from '@nextui-org/react';

export interface PropsCard extends CardProps{
    active?: boolean,
    size?: 'xs' | 'xl' | 'md',
    animation?: AnimationNames,
    onClick?: () => void,
    width?: 'full' | 'auto',
    children: ReactNode | ReactNode[]
}

export type IHeader = Partial<React.ComponentPropsWithoutRef<typeof CardNext.Header>> & {
    children: JSX.Element
}

export type IBody = Partial<React.ComponentPropsWithoutRef<typeof CardNext.Body>> & {
    children: ReactNode | ReactNode[]
}
export type IFooter = Partial<React.ComponentPropsWithoutRef<typeof CardNext.Footer>> & {
    children: JSX.Element
}

type TAlign = 'center' | 'start' | 'end' | 'between';

export interface ICol extends Partial<React.ComponentPropsWithoutRef<typeof ColNext>> {
    align?: TAlign,
    children: JSX.Element | React.ReactElement[] | string
} 

export interface IRow extends Partial<React.ComponentPropsWithoutRef<typeof RowNext>>  {
    children: React.ReactElement | React.ReactElement[]
}

export interface IGrid extends Partial<React.ComponentPropsWithoutRef<typeof GridNext>> {
    children: React.ReactElement | React.ReactElement[]
}

export interface IGridContainer extends Partial<React.ComponentPropsWithoutRef<typeof GridNext.Container>> {
    children: React.ReactElement | React.ReactElement[]
}