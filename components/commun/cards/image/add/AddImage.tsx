// import all the necessary libraries
import React, { ChangeEvent, MutableRefObject } from 'react';
import { Card, Icon } from '@/components/commun';
import { useTheme } from '@nextui-org/react';

// import the style
import StyleNameCaretaker from '@/helpers/ClassNameCreator'
import ImageStyle from './Image.module.scss'
const cg = StyleNameCaretaker(ImageStyle)

import { useTranslation } from 'react-i18next';
import { DialogNotification } from '@/components/dialog';

const NewImage = ({ errors, inputRef, handleUpdateClick, updateFile }: { errors: string[], inputRef: MutableRefObject<any>, handleUpdateClick: () => void, updateFile: (event: ChangeEvent<HTMLInputElement>) => Promise<void> }) => {
    const { theme } = useTheme();
    const { t } = useTranslation(['form']);

    return (
        <>
            <Card isPressable variant='bordered' css={{ marginBottom: '2rem' }} animation='y' size='md' onClick={handleUpdateClick} isHoverable >
                <Card.Body >
                    <div className={ImageStyle.image} >
                        <div className={ImageStyle.icon} >
                            <Icon name='photoDown' size='120' color={theme?.colors.gray500.value} />
                        </div>
                        <div className={ImageStyle.content} >
                            <h3 className={ImageStyle.title}>{t('field.img.placeholder')}</h3>
                            <p className={ImageStyle.description} >{t('field.img.motivation')}</p>
                        </div>
                    </div>
                </Card.Body>
            </Card>
            {errors.map((err, index) => <DialogNotification key={index} open={!!errors} type='error' >{err}</DialogNotification>)}
            <input type="file" name='file' ref={inputRef} placeholder='file' onChange={updateFile} className={'hidden'} />
        </>
    )
}

export default NewImage;