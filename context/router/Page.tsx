import React, { createContext, useMemo, memo } from 'react';
import { ANGLES } from 'constants/router';
import { ObjectValue } from '@/types/helpers';
import { useQueryState } from '@/hooks';

interface IActiveAngle {
    activeAngle: ObjectValue<typeof ANGLES>;
    setActiveAngle: (value: ObjectValue<typeof ANGLES>) => void;
}

const defaultAngle: ObjectValue<typeof ANGLES> = ANGLES.HOME;

const ActiveAngleContext = createContext<IActiveAngle>({
    activeAngle: defaultAngle,
    setActiveAngle: () => {}
});

const ActiveAngleProvider = ({ children }: { children: React.ReactElement }) => {
    const [activeAngle, setActiveAngle] = useQueryState<ObjectValue<typeof ANGLES>>('page', defaultAngle, ANGLES);
    
    return (
        <ActiveAngleContext.Provider value={{ activeAngle, setActiveAngle }}>
            {children}
        </ActiveAngleContext.Provider>
    );
};

export { ActiveAngleContext, ActiveAngleProvider };