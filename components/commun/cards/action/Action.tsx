// global resources
import React from 'react'

// style
import StyleNameCaretaker from '@/helpers/ClassNameCreator'
import ActionStyle from './Action.module.scss'
const cg = StyleNameCaretaker(ActionStyle)

import { Card ,Button, Field, Row } from '@/components/commun';

const Action = ({ title, button, action }: { title: string, button: string, action: () => void }) => {
    
    return (
        <>
            <Card isHoverable isPressable onClick={action}>
                <Card.Body>
                    <Row justify='space-between' align='center' >
                        <h4 {...cg('title')}>
                            {title}
                        </h4>
                        <Button.Action>{button}</Button.Action>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}

export default Action;