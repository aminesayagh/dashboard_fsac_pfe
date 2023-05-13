import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import { fileSizeMax, fileSizeUnity } from '@/config/limit';

import { ObjectValue } from '@/types/helpers';
import UploadService from '@/services/FileUploadService';

import { AllowedFileTypes } from '@/constants/image';
import { convertToArray } from '@/helpers/database';

type TAllowedFileTypes = ObjectValue<typeof AllowedFileTypes>

interface Props {
    maxFileSize?: number,
    allowedFileTypes?: TAllowedFileTypes[],
    callbackFn?: (image: any) => Promise<void> | null
}

const defaultAllowedFileTypes: TAllowedFileTypes[] = convertToArray(AllowedFileTypes);


import { useTranslation } from 'react-i18next';

import { CloudImage } from '@/types/cloudinary';

const errorMessages = [
    'fileNotExist',
    'fileSizeLimit',
    'fileErrorServer',
    'fileType',
    'fileSize',
    'fileCount',
    'fileCountLimit'
] as const
const useUpdateFiles = ({...props}: Props, callbackFn: ((image: any) => Promise<void>) | null = null) => {
    const [files, setFiles] = useState<CloudImage[]>([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [progress, setProgress] = useState<number>(0);

    const { t } = useTranslation(['form']);

    const maxFileSize = props.maxFileSize || fileSizeMax;
    const allowedFileTypes = props.allowedFileTypes || defaultAllowedFileTypes;

    const addError = (error: string) => setErrors((e) => [...e, error]);
    const addFile = (file: CloudImage) => setFiles((f) => [...f, file]);
    const removeFile = (index: number) => {
        setFiles(prevItems => prevItems.filter((item, i) => i !== index));
    };
    const updateFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        setErrors([]);
        
        try{ 
            if(!event.target.files) throw new Error(t('fileNotExist') as string);
            const updatedFile = event.target.files[0];
            if(!updatedFile) throw new Error(t('fileNotExist') as string);

            const fileSize = updatedFile.size;
            const fileType = updatedFile.type;
            if (fileSize > maxFileSize) {
                throw new Error(t('error.fileSizeLimit', { name: updatedFile.name, fileSizeMax: fileSizeMax / 1000000 }) as string);
            }
            if (allowedFileTypes.length > 0 && !allowedFileTypes.includes(fileType as TAllowedFileTypes)) {
                throw new Error(t('error.fileType', { name: updatedFile.name, fileType: fileType }) as string);
            }

            if(errors.length === 0) {
                const { data, status } = await UploadService.upload({ file: updatedFile }, (progressEvent) => {
                    setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
                })
                if (status > 300) {
                    throw new Error('Error response api');
                }

                addFile({ name: updatedFile.name, ...data });
                !!callbackFn && await callbackFn(data);
            } else {
                console.log('error in stock',errors);
                throw new Error(t('error.fileErrorServer') as string);
            }
        }catch(err: any){
            const errorMessage = err.message || null;
            if(typeof errorMessage == 'string'){
                addError(errorMessage);
            }else {
                addError(t('error.fileErrorServer'));
            }
        }
        setLoading(false);
    }

    const inputRef = useRef<any>();
    const handleUpdateClick = () => {
        inputRef?.current?.click();
    }

    return { files, loading, errors, progress, ref: { inputRef, handleUpdateClick }, updateFile, removeFile };
}

export default useUpdateFiles;