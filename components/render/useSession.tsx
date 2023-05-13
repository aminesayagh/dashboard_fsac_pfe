
import { useSession } from 'next-auth/react';
import { Loading } from '@/components/commun';
import { Session } from 'next-auth';

const UseSessionUser = ({ render }: { render: ({ session }: { session: Session }) => React.ReactElement }) => {
    const { data: session, status } = useSession();
    if(status == 'loading'){
        return <Loading />
    }
    if(!session) return <Loading />
    return render({ session });
}

export default UseSessionUser;