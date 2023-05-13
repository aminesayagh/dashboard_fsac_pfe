// global resources
import React from 'react'
import { Button, ButtonProps, Loading } from '@nextui-org/react';
import { Icon } from '@/components/commun';

type GlobalButtonProps = {
    onClick?: ButtonProps['onClick'],
    children?: ButtonProps['children'],
    color?: ButtonProps['color'],
    autoFocus?: ButtonProps['autoFocus'],
    icon?: ButtonProps['icon'],
    type?: ButtonProps['type'],
}


type ButtonPropsPrimary = {
    shadow?: boolean,
    size?: ButtonProps['size'],
} & GlobalButtonProps;

export const Attractive = ({ children, ...props }: ButtonPropsPrimary) => {
    return <Button auto  css={{ fontWeight: 600 }} color='primary' size='md' {...props}  >{children}</Button>
}

type ButtonPropsAction = {
    shadow?: ButtonProps['shadow'],
    auto?: ButtonProps['auto'],
    isLoading?: boolean,
    size?: ButtonProps['size'],
} & GlobalButtonProps;
export const Action = ({ children, isLoading = false, ...props }: ButtonPropsAction) => {
    const propsLoading = isLoading ? {
        disabled: true,
        css: { px: "$13" }
    } as Partial<ButtonProps> : {};
    return <Button auto flat css={{ fontWeight: 600 }} size='md' {...props} {...propsLoading} >{!isLoading ? children : <Loading type='points' color="currentColor" size="sm" />}</Button>
}

type ButtonPropsSecondary = {
    shadow?: boolean,
} & GlobalButtonProps;
export const Secondary = ({ children, ...props }: ButtonPropsSecondary) => {
    return <Button auto flat css={{ fontWeight: 600 }}  {...props} size='sm' >{children}</Button>
}

type ButtonPropsItem = {
    css?: ButtonProps['css'],
    auto?: ButtonProps['auto'],
} & GlobalButtonProps;
export const Item = ({ children, css ,...props }: ButtonPropsItem) => {
    return <Button light size='md' css={{ fontWeight: 600, alignItems: 'start', display: 'flex', justifyContent: 'start', ...css }} {...props} >{children}</Button>
}