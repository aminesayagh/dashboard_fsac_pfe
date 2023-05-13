
import { Icon, Button, Card } from 'components/commun';


// style
import StyleNameCaretaker from '@/helpers/ClassNameCreator'
import TaskPfeStyle from './Task.module.scss'

interface Props {
    title: string;
    desc?: string | null;
    mainAction?: {
        name: string;
        handler: () => void;
    },
    secondAction?: {
        name: string;
        handler: () => void;
    }
}

const Task = ({ title, desc, mainAction, secondAction }: Props) => {
    return (<>
        <Card >
            <Card.Body>
                <div className={TaskPfeStyle.container}>
                    <div className={TaskPfeStyle.icon}>
                        <Icon name='Checklist' size='32' />
                    </div>
                    <div className={TaskPfeStyle.content}>
                        <h5>{title}</h5>
                        {desc ? <p>{desc}</p> : null}
                    </div>
                    <div className={TaskPfeStyle.action}>
                        {mainAction ? <Button.Action onClick={mainAction.handler} >{mainAction.name}</Button.Action> : null}
                        {secondAction ? <Button.Secondary onClick={secondAction.handler} >{secondAction.name}</Button.Secondary> : null}
                    </div>
                </div>
            </Card.Body>
        </Card>
    </>)
}

export default Task