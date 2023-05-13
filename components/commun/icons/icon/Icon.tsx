import React from 'react'

import Icons, { IconNames, IconProps as IconsProps } from '../IconsList';
import { SVGAttributes } from 'react';


interface IconProps extends SVGAttributes<SVGElement>, IconsProps {
    
    name: IconNames
}
const Icon = ({ size, name, ...props }: IconProps) => {
    return (
        <>
            <svg width={size} height={size}  {...props}>
                {
                    !!Icons[name] && Icons[name]({ width: size, height: size, ...props })
                }
            </svg>
        </>
    )
}

export default Icon;