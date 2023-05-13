
import { useRef, useEffect, useState, MutableRefObject, ChangeEvent } from 'react';
import { Loading } from "@/components/commun";
// style
import StyleNameCaretaker from '@/helpers/ClassNameCreator'
import ImageStyle from './Image.module.scss'
const cg = StyleNameCaretaker(ImageStyle)

import { IProfile } from 'types/Auth';

import { useTheme } from '@nextui-org/react';
import { useUpdateFile } from '@/hooks';
import { AllowedFileTypes } from '@/constants/image';
import { mutationProfile } from "@/query/Profile";

import { CardImageProfile, CardAddImage } from '@/components/commun/cards'


export default function Image({ profile }: { profile: IProfile }) {
    const mutateProfile = mutationProfile();
    const { ref: { inputRef, handleUpdateClick }, updateFile, errors, removeFile, loading } = useUpdateFile({
        allowedFileTypes: [AllowedFileTypes.JPEG, AllowedFileTypes.PNG],
    }, async (image) => {
        mutateProfile.mutate({ id: profile._id, value: { img: image.url } })
        setIsValidImage(true)
    });
    const { theme } = useTheme();
    const [isValidImage, setIsValidImage] = useState(true);
    return (
        <>
            {loading ? <><Loading /></> : profile?.img && isValidImage ? <CardImageProfile buttonAction={() => {
                removeFile(0);
                setIsValidImage(false);
            }} profile={profile} /> : (<>
                <CardAddImage errors={errors} inputRef={inputRef} handleUpdateClick={handleUpdateClick} updateFile={updateFile} />
            </>)}
        </>
    )
}