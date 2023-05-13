
import { Card } from '@/components/commun';

export default function ErrorLoading({ error }: { error: string }) {
    return (<>Error Loading data {error}</>)
}

export function Error({ message }: { message: string }) {
    return (<><Card variant='bordered' >
        <Card.Body>
            <p>{message}</p>
        </Card.Body>
    </Card></>)
}