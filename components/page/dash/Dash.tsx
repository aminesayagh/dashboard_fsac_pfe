// global resources
import React, { useContext } from 'react'

// style
import StyleNameCaretaker from '@/helpers/ClassNameCreator'
import DashStyle from './Dash.module.scss'
const cg = StyleNameCaretaker(DashStyle)

import { ActiveAngleContext } from '@/context/router/Page';
import { Views } from './views';;
import { ActiveItemsProvider } from '@/context/router/Items';

import { View } from '@/components/layout/dash';

const Dash = ({ }) => {
    const { activeAngle } = useContext(ActiveAngleContext);

    return (
        <>
            <View>
                <ActiveItemsProvider>
                    {React.createElement(Views[activeAngle], {})}
                </ActiveItemsProvider>
            </View>
        </>
    )
}

export default Dash;