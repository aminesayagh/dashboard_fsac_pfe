// global resources
import React from 'react'
import { Avatar, AvatarProps } from '@nextui-org/react'
// style


// import { classAdd as cg } from '@/helpers/ClassNameCreator';
import StyleNameCaretaker from '@/helpers/ClassNameCreator';
import AvatarStyle from './Avatar.module.scss';
const cg = StyleNameCaretaker(AvatarStyle);

import { useMedia } from '@/hooks';
import { ObjectValue } from '@/types/helpers';
import { STATE_USER_ROLE } from '@/constants/db';


type Props = {
    src: string | undefined,
    name: string | undefined,
    roles: ObjectValue<typeof STATE_USER_ROLE>[] | ObjectValue<typeof STATE_USER_ROLE> | undefined,
    back?: 'dark' | 'light'
} & AvatarProps;

const AvatarDefault = ({ src, name, roles, back = 'light', size = 'xl', ...props }: Props) => {
    const avatarText = useMedia<boolean>(['(min-width: 650px)'], [true], false);

    return (
        <>
            <div {...cg('avatar')} >
                <div {...cg('image')} >
                    <Avatar {...props} bordered color='primary' size={size} src={src} />
                </div>
                {avatarText && <div {...cg('content', [['size', size as string], ['back', back]])} >
                    {Array.isArray(roles) ? roles?.map((role) => <h5 {...cg('text', ['role'])}>{role}</h5>) : <h5 {...cg('text', ['role'])}>{roles}</h5>}
                    <h4 {...cg('text', ['name'])}>{name}</h4>
                </div>}
            </div>
        </>
    )
}

export default AvatarDefault;