
import Style from './Notification.module.scss';

import { Card, Icon, Button } from '@/components/commun';

interface Props {
    open: boolean,
    type: ObjectValue<typeof TYPES>,
    mainAction?: {
        title: string,
        onClick: () => void
    }
    children: string
}

import { TYPES } from '@/constants/props';
import { ObjectValue } from '@/types/helpers';
const style = require('@/constants/style.ts');

const IconName = {
    [TYPES.INFO]: { name: 'InfoSquareRounded', color: style.COLORS.black_6 },
    [TYPES.SUCCESS]: { name: 'MoodWink', color: style.COLORS.valid_2 },
    [TYPES.WARNING]: { name: 'AlertTriangle', color: style.COLORS.warring_1 },
    [TYPES.ERROR]: { name: 'MoodSadSquint', color: style.COLORS.error_1 }
} as const;

const ButtonColor = {
    [TYPES.INFO]: { color: 'primary' },
    [TYPES.SUCCESS]: { color: 'success' },
    [TYPES.WARNING]: { color: 'warning' },
    [TYPES.ERROR]: { color: 'error' }
} as const;

const Notification = ({ open, type, mainAction, children }: Props) => {
    return (
        <>
            <Card active={open} variant='bordered' isHoverable animation='y'>
                <Card.Body >
                    <div className={Style.container}>
                        <div className={Style.iconContainer}>
                            <Icon size={30} {...IconName[type]} />
                        </div>
                        <div className={Style.contentContainer}>
                            <h5 className={Style.message}>
                                {children}
                            </h5>
                            {
                                !mainAction ? <></> : <div className={Style.message}>
                                    <Button.Secondary color={ButtonColor[type].color} onClick={mainAction.onClick} >
                                        {mainAction.title}
                                    </Button.Secondary>
                                </div>
                            }
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default Notification;