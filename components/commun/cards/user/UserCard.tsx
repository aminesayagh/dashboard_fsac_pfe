// global resources
import React from 'react'

// style
import StyleNameCaretaker from '@/helpers/ClassNameCreator'
import UserCardStyle from './UserCard.module.scss'
const cg = StyleNameCaretaker(UserCardStyle)

import { Card, Row } from '@/components/commun';
import { IUserAuth } from '@/types/mongodb/User';

const UserCard = ({ user }: { user: IUserAuth }) => {

    return (
        <>
            <Card isPressable>
                <Card.Body>
                    <Card.Image
                        src={user.img || ''}
                        objectFit='cover'
                        width='100&'
                        height={140}
                        alt={`image profile ${user.last_name} ${user.first_name}`}
                    />
                </Card.Body>
                <Card.Footer css={{ justifyItems: 'flex-start' }} >
                    <div>
                        <Row wrap='wrap' justify='space-between' align='center' >
                            {/* <Avatar /> */}
                        </Row>
                        <Row wrap='wrap' justify='space-between' align='center' >

                        </Row>
                    </div>
                </Card.Footer>
            </Card>
        </>
    )
}

export default UserCard;