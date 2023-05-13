import { useState} from 'react';

const UseModal = () => {
    const [visible, setVisible] = useState<boolean>(false);

    const handler = () => setVisible(true);
    const closeHandler = () => setVisible(false);

    return { handler, closeHandler, visible } as const;
}

export default UseModal;