import React, { useMemo } from 'react';
import { SimpleColors } from "@nextui-org/react";
import { FieldError } from 'react-hook-form';

interface Props{
    render: (helpers: {text: string, color: SimpleColors}) => React.ReactElement,
    error: Omit<FieldError, 'type'> | undefined,
    checkError: boolean,
}

const HelperBuilder = ({ render, error, checkError }: Props) => {
    const helpers = useMemo(() => {
        if (!checkError) {
            return {
                text: '',
                color: 'default' as SimpleColors,
            }
        }
        if (!!error && !!error.message) {
            return {
                text: error?.message || '',
                color: 'error' as SimpleColors,
            }
        }
        return {
            text: error?.message || '',
            color: 'success' as SimpleColors
        }
    }, [error, checkError])
    return render(helpers);
}

export default HelperBuilder;