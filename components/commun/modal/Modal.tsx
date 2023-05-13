// global resources
import React, { useContext, createContext } from 'react'


import { Modal, ModalProps, ModalBodyProps, ModalFooterProps, ModalHeaderProps } from "@nextui-org/react";

import { useModal } from '@nextui-org/react'

interface PropsModal extends Omit<ModalProps, 'children'> {
    children: React.ReactNode;
}

const ContextModal = createContext<ReturnType<typeof useModal> | undefined>(undefined)

const ModalUi = ({ children, ...props }: { children: React.ReactNode }) => {
    const modal = useModal();

    return <><ContextModal.Provider value={modal} >
        {children}
    </ContextModal.Provider>
    </>
}

const Button = ({ children }: { children: ({ handler }: { handler: () => void }) => JSX.Element }) => {
    const { setVisible } = useContext(ContextModal) || {};
    if (!setVisible) return <></>;
    return children({ handler: () => setVisible(true) })
}

const ModalUiContainer = ({ children, ...props }: PropsModal) => {
    const { bindings } = useContext(ContextModal) || {};
    return (
        <Modal scroll closeButton aria-labelledby="modal-fsac" blur {...bindings} {...props} >
            {children}
        </Modal>
    )
}

const ModalUiHeader = ({ children, ...props }: Partial<ModalHeaderProps>) => {
    return (
        <Modal.Header {...props} >
            {children}
        </Modal.Header>
    )
}

const ModalUiBody = ({ children, ...props }: Partial<ModalBodyProps>) => {
    return (
        <Modal.Body {...props} css={{ paddingTop: '2rem', paddingBottom: '2rem' }} >
            {children}
        </Modal.Body>
    )
}

const ModalUiFooter = ({ children, ...props }: Partial<ModalFooterProps>) => {
    return (
        <Modal.Footer {...props} >
            {children}
        </Modal.Footer>
    )
}

ModalUi.Container = ModalUiContainer
ModalUi.Header = ModalUiHeader
ModalUi.Body = ModalUiBody
ModalUi.Footer = ModalUiFooter
ModalUi.Button = Button

export default ModalUi;