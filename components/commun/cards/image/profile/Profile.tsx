

import { Icon, Button, Avatar, Card, Col, Row } from '@/components/commun';
import { IProfile } from 'types/Auth';

import { getFullName, getProfileImage } from '@/helpers/generateNameProfile';
import { useTranslation } from 'react-i18next';

function CardImage({ buttonAction, profile }: { buttonAction: () => void, profile: Pick<IProfile, 'img' | 'gender' | 'statusUserRole' | 'last_name' | 'first_name'> }) {
    const { t } = useTranslation(['form']);

    return (<Card isHoverable css={{ w: "100%", height: 400 }}>
        <Card.Body css={{ p: '0' }}>
            <Card.Image src={getProfileImage(profile)} objectFit="cover" width="100%" height="100%" alt="Avatar Image" />
        </Card.Body>
        <Card.Footer
            isBlurred
            css={{
                position: "absolute",
                bgBlur: "#0f111466",
                borderTop: "$borderWeights$light solid $gray800",
                bottom: 0,
                zIndex: 1,
                p: 15
            }}
        >
            <Row align='center' justify='space-between'>
                <Col align='start'>
                    <Avatar roles={profile?.statusUserRole} name={getFullName({ ...profile })} src={profile?.img} />
                </Col>
                <Col align='end' >
                    <Button.Secondary onClick={buttonAction} color='warning'>{t('action.updateImage')}</Button.Secondary>
                </Col>
            </Row>
        </Card.Footer>
    </Card>)
}

export default CardImage;