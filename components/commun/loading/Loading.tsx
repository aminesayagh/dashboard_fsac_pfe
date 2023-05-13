import { Loading as LoadingNextUi } from '@nextui-org/react';

import { Card } from '@/components/commun';

const Loading = () => {
    return <Card animation='visible'>
        <Card.Body css={{ p: 20 }}>
            <LoadingNextUi type='points' />
        </Card.Body>
    </Card>
}

export default Loading;