import { useState } from 'react';

import { IProfile } from 'types/Auth';

import { mutationProfile } from "@/query/Profile";
import { AllowedFileTypes } from '@/constants/image';

import { useUpdateFile } from '@/hooks';
import { CardAddImage } from '@/components/commun/cards'

export default function Image({ profile, send }: { profile: IProfile, send: () => void }) {
    const mutateProfile = mutationProfile();

    const { ref: { inputRef, handleUpdateClick }, updateFile, errors, removeFile } = useUpdateFile({
        allowedFileTypes: [AllowedFileTypes.JPEG, AllowedFileTypes.PNG],
    }, async (image) => {
        mutateProfile.mutate({ id: profile._id, value: { img: image.url } });
        send();
    });
    return (
        <>
            <CardAddImage errors={errors} inputRef={inputRef} handleUpdateClick={handleUpdateClick} updateFile={updateFile} />
        </>
    );
}