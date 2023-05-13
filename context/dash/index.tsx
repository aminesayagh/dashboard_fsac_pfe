
import { ActiveAngleProvider } from '../router/Page';
import GroupePfeProvider from './GroupePfeMachine';

export default function Providers({ children }: { children: React.ReactElement }) {
    return <>
        <ActiveAngleProvider >
            <GroupePfeProvider >
                {children}
            </GroupePfeProvider>
        </ActiveAngleProvider></>
}