import { User } from 'tabler-icons-react';
import { IconInfoSquareRounded, IconMoodWink, IconChecklist,IconBorderAll ,IconTable, IconMoodSadSquint,IconCameraPlus ,IconPencil,IconCirclePlus,IconAlertTriangle, IconEye, IconEyeOff, IconTrash, IconPhotoDown, IconArchive, IconLockOpen, IconArrowBarDown, IconArrowBarUp } from '@tabler/icons';
import { FC, SVGAttributes } from 'react';

export interface IconProps extends SVGAttributes<SVGElement> {
  color?: string;
  size?: string | number;
}

const ListIconComponent = {
    'User': (props: IconProps) => <User {...props}/>,
    'InfoSquareRounded': (props: IconProps) => <IconInfoSquareRounded {...props}/>,
    'MoodWink': (props: IconProps) => <IconMoodWink {...props} />,
    'MoodSadSquint': (props: IconProps) => <IconMoodSadSquint {...props} />,
    'AlertTriangle': (props: IconProps) => <IconAlertTriangle {...props}/>,
    "eye": (props: IconProps) => <IconEye {...props}/>,
    "eyeOff": (props: IconProps) => <IconEyeOff {...props} />,
    "trash": (props: IconProps) => <IconTrash {...props} />,
    "photoDown": (props: IconProps) => <IconPhotoDown {...props} />,
    "archive": (props: IconProps) => <IconArchive {...props} />,
    "lockOpen": (props: IconProps) => <IconLockOpen {...props}/>,
    "sadSquint": (props: IconProps) => <IconCameraPlus {...props} />,
    "CirclePlus": (props: IconProps) => <IconCirclePlus {...props} />,
    'Edit': (props: IconProps) => <IconPencil {...props} />,
    "Table": (props: IconProps) => <IconTable {...props} />,
    "Cards": (props: IconProps) => <IconBorderAll {...props} />,
    "Checklist": (props: IconProps) => <IconChecklist {...props} />,
    "ArrowBarDown": (props: IconProps) => <IconArrowBarDown {...props} />,
    "ArrowBarUp": (props: IconProps) => <IconArrowBarUp {...props} />,
};

export type IconNames = keyof typeof ListIconComponent;

export default ListIconComponent as { [key in IconNames]: (props: IconProps) => JSX.Element};