import React, { createContext, useMemo, useEffect, useContext, useState } from 'react';
import { ITEMS } from 'constants/router';
import { ObjectValue } from '@/types/helpers';
import { useQueryState } from '@/hooks';
import { ActiveAngleContext } from './Page';
import { getDefaultItem } from '@/config/router/angle';

export type TItemNames = ObjectValue<typeof ITEMS> | undefined;
interface IActiveItem {
    activeItem?: TItemNames;
    setActiveItem: (value: TItemNames) => void;
}

const ActiveItemsContext = createContext<IActiveItem>({
    setActiveItem: () => {}
});

const ActiveItemsProvider = ({ children }: { children: React.ReactElement }) => {
    const { activeAngle } = useContext(ActiveAngleContext)
    const [defaultItem ,setDefaultItem] = useState<TItemNames>(undefined);
    useEffect(() => {
        const defaultItem = getDefaultItem(activeAngle);
        if(!!defaultItem) {
            setDefaultItem(defaultItem);
        }
    }, [activeAngle])

    
    const [activeItem, setActiveItem] = useQueryState<TItemNames>(activeAngle, defaultItem, ITEMS);

    return (
        <ActiveItemsContext.Provider value={{ activeItem, setActiveItem }}>
            {children}
        </ActiveItemsContext.Provider>
    );
};

export { ActiveItemsContext, ActiveItemsProvider };