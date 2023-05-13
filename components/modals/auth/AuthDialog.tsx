
import { useEffect, useState } from 'react';
import { AsyncRenderComponent } from '@/components/render';
import Modal from 'components/commun/modal';

import StyleNameCaretaker from '@/helpers/ClassNameCreator'
import AuthStyle from './Auth.module.scss';
const cg = StyleNameCaretaker(AuthStyle);


import { getProviders, signIn, useSession, LiteralUnion, ClientSafeProvider } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

import { AuthForm, SignUpForm } from '@/components/forms'
import { Provider } from '@/components/commun';

import { useTranslation } from 'react-i18next';

const AuthProviders = ({ }) => {
    const [providers, setProviders] = useState<Record<
        LiteralUnion<BuiltInProviderType, string>,
        ClientSafeProvider
    > | null>();
    const { status } = useSession();
    useEffect(() => {
        const setTheProviders = async () => {
            const setupProviders = await getProviders();
            setProviders(setupProviders);
        }
        setTheProviders();
    }, []);
    return (
        <>
            <AsyncRenderComponent
                isLoading={status == 'loading'}
            >
                <div >
                    {!!providers && Object.values(providers).map((provider) =>
                        provider?.name !== 'login' && <Provider key={provider?.name} {...{ id: provider.id, name: provider.name, signIn: signIn }} />
                    )}
                </div>
            </AsyncRenderComponent>
        </>
    )
}

const ModalAuth = ({ hasAccount = false, children }: { hasAccount?: boolean, children: Parameters<typeof Modal.Button>[number]['children'] }) => {
    const [isAuth, setIsAuth] = useState(hasAccount);
    const { t } = useTranslation(['translation']);

    return (
        <>

            <Modal>
                <Modal.Button >
                    {children}
                </Modal.Button>
                <Modal.Container>
                    <Modal.Header>
                        <h3 >
                            {t(`models.${isAuth ? 'auth' : 'signUp'}.title`)}
                        </h3>
                    </Modal.Header>
                    <Modal.Body>
                        <>
                            <div >
                                {isAuth ? <AuthForm /> : <SignUpForm />}
                                <AuthProviders />
                            </div>
                            <div className={AuthStyle['auth_changeState']} >
                                <button className={AuthStyle.button} onClick={() => setIsAuth(!isAuth)}>{t(`models.${isAuth ? 'auth' : 'signUp'}.change`)}</button>
                            </div>
                        </>
                    </Modal.Body>
                </Modal.Container>
            </Modal>
        </>
    )
}

export default ModalAuth;