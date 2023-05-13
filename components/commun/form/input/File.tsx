import { Controller, FieldPath, ControllerRenderProps } from 'react-hook-form';
import { useState, useRef, useEffect } from 'react';
import { InputHTMLAttributes, ChangeEvent } from 'react';

import { Button } from '@/components/commun';
import { Card, Col, Row } from '@/components/commun';
import { Icon } from '@/components/commun';

type DefaultTypeObject = { [key: string]: any }

import StyleNameCaretaker from '@/helpers/ClassNameCreator';
import FileStyle from './Input.module.scss';
const cg = StyleNameCaretaker(FileStyle);

import { useUpdateFile } from '@/hooks';

import { Loading } from '@/components/commun';

export interface Props<T extends DefaultTypeObject> extends InputHTMLAttributes<HTMLInputElement> {
    name: FieldPath<T>,
    label: string,
}

function InputFile<T extends DefaultTypeObject>({ field }: { field: ControllerRenderProps<T, FieldPath<T>> }) {
    const { files, ref: { inputRef, handleUpdateClick }, updateFile, loading,errors, removeFile } = useUpdateFile({});
    const { t } = useTranslation(['form'])
    useEffect(() => {
        if (errors.length > 0) field.onChange(files);
    }, [files])

    return (
        <>
        
            {!loading ? files && files.map((file, index) => <ul className='gap-0 p-0 m-0'>
                <Card variant="bordered" isHoverable key={index}>
                    <Card.Body >
                        <Row >
                            <Col>
                                <p className='content' >
                                    <span {...cg('marker')}>{t('error.imported')}</span> : {file?.name}
                                </p>
                            </Col>
                            <Col>
                                <div {...cg('delete')} onClick={() => removeFile(index)}>
                                    <Icon name='trash' size='20' color='#E45851' />
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </ul>) : <Loading />}
            <Button.Action onClick={handleUpdateClick}>{!files ? t('error.action') : t('error.reaction')}</Button.Action>
            <input type='file' name='file' placeholder='file' ref={inputRef} onChange={updateFile} className={'hidden'} />
            {!!errors && <Card><p className='text-xs text-error_1'>{errors}</p></Card>}
        </>
    )
}
import { FormContext, TProvider } from '../FormProvider';
import { useTranslation } from 'react-i18next';

export function FileLocal<T extends DefaultTypeObject>({ name, label, ...props }: Props<T>) {

    return <FormContext.Consumer >
        {({ control, errors, checkError }: TProvider<T>) => {
            if (!control || !errors) throw new Error('Input File has no provided parent');
            return <Controller control={control} name={name} render={({ field }) => {
                return <>
                    <div className='flex flex-col gap-y-2 justify-start items-start' >
                        <label className='' >
                            {label}
                        </label>
                        <InputFile field={field} />
                    </div>
                </>
            }} />
        }}
    </FormContext.Consumer>
}