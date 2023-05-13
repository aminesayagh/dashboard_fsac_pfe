import { Types } from "mongoose"

import { QueryUser } from '@/query/User';


import Modal from '@/components/commun/modal';

import StyleNameCaretaker from '@/helpers/ClassNameCreator'
import StudentStyle from './Student.module.scss'
const cg = StyleNameCaretaker(StudentStyle)

import { Card, Badge, Button } from '@/components/commun';
import { Tooltip } from "@nextui-org/react";

import { useTranslation } from 'react-i18next';

import { useUpdateUsers } from '@/table/User';
import { useMutateUser } from '@/query/User'

import { useMedia } from "@/hooks";
import { STATE_USER_ROLE } from "@/constants/db";

type Item = {
    title: string,
} & ({
    type: 'badge',
    value: {
        state: 'success' | 'error' | 'warning',
        text: string | string[] | undefined
    }
} | {
    type: 'text',
    value: string | undefined
})
const Item = ({ title, value, type }: Item) => {
    
    return (
        <div {...cg('model', ['item', type])}>
            <h6 {...cg('item', 'title')}>
                {title}
            </h6>
            {type == 'badge' ? <div  {...cg('item', ['value', type])}>
                {Array.isArray(value.text) ? value?.text.map(s => <Badge type={value?.state} >
                    {s || '---'}
                </Badge>) : <Badge type={'error'} >
                    {value.text || '---'}
                </Badge>}
            </div>
                : <p {...cg('item', ['value', type])}>
                    {!!value ? value : '---'}
                </p>}
        </div>
    )
}

const UpdateUser = ({ id }: { id: string | Types.ObjectId }) => {
    const { t } = useTranslation(['dialog']);
    return <>
        <Card>
            <Card.Body>
                <p>{t('validate_student_account.description')}</p>
            </Card.Body>
        </Card>
    </>
}

export const StudentView = ({ children, id }: { id: string, children: ({ handler }: { handler: () => void }) => React.ReactElement }) => {
    const { t } = useTranslation(['form']);

    const height = useMedia(['(min-width: 1024px)'], ['450px'], '300px');
    const modelWidth = useMedia(['(min-width: 1024px)'], ['80%'], '90%');
    const { mutate: mutateUsers } = useUpdateUsers(id);
    const { mutate: mutateUser } = useMutateUser(id);

    return <>
        <Modal>
            <Modal.Button>
                {children}
            </Modal.Button>
            <Modal.Container width={modelWidth}>
                <Modal.Body>
                    <QueryUser id={id} render={({ user }) => {
                        const option = user.studentDoc?.option[0]?.name;
                        return <div {...cg('model', 'container')}>
                            <div {...cg('model', 'img')}>
                                <Card>
                                    <Card.Body css={{ p: 0 }}>
                                        <Card.Image
                                            src={user.img || ''}
                                            css={{ p: 0 }}
                                            width='100%'
                                            height={height}
                                            objectFit='cover'
                                            alt={`image profile ${user.last_name ?? ''} ${user.first_name ?? ''}`}
                                        />
                                    </Card.Body>
                                    <div></div>
                                </Card>
                            </div>
                            <div {...cg('model', 'info')}>
                                <div {...cg('row')}>
                                    <Item type='text' title={t('field.last_name.attribute') || ''} value={user.last_name} />
                                    <Item type='text' title={t('field.first_name.attribute') || ''} value={user.first_name} />
                                    <Item type='text' title={t('field.email.attribute') || ''} value={user.email} />
                                    <Item title="Status" value={{ state: user.statusUserRole.includes(STATE_USER_ROLE.VISITOR) ? 'warning' : 'success', text: user.statusUserRole }} type='badge' />
                                    <Item title={t('field.option.attribute') || ''} value={{ state: 'warning', text: !!option ? [t(`field.option.values.${option}`)] : undefined }} type='badge' />
                                    <Item type='text' title={t('field.cne.attribute') || ''} value={user?.studentDoc?.cne} />
                                    <Item type='text' title={t(`field.cin.attribute`)} value={user.cin} />
                                </div>
                                <div {...cg('row')}>
                                    <Tooltip trigger="click" css={{ zIndex: 99999999 }} content={<UpdateUser id={id} />}>
                                        <Button.Action onClick={() => {
                                            mutateUsers({ statusUserRole: [STATE_USER_ROLE.STUDENT] })
                                            mutateUser({ statusUserRole: [STATE_USER_ROLE.STUDENT] })
                                        }}>{t('action.validStudent')}</Button.Action>
                                    </Tooltip >
                                </div>

                            </div>
                        </div>
                    }} />
                </Modal.Body>
            </Modal.Container>
        </Modal>
    </>
}

