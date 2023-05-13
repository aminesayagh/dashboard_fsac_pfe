import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Icon from './icon';
import Icons from './IconsList';

const IconsList = ({ size, color }: { size: number, color: string }) => {
    return (
        <>
            <div className='flex flex-row gap-12 flex-wrap' >
                {Object.keys(Icons).map((key) => {
                    // @ts-ignore
                    return (<><Icon key={key} name={key} size={size} color={color}/></>)
                })}
            </div>
        </>
    )
}

export default {
    title: 'commun/Icons',
    component: IconsList
} as ComponentMeta<typeof IconsList>

const Template: ComponentStory<typeof IconsList> = args => <IconsList {...args} />;

export const IconList = Template.bind({ })
IconList.args = {
    size: 80,
    color: '#000000'
}