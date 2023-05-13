import { getToken } from 'next-auth/jwt';
import multer from 'multer';
import path from 'path';
import { v2 as cloudImage } from 'cloudinary';

import routerInstance from '@/lib/router';
const router = routerInstance();


// https://dev.to/hackmamba/image-and-video-upload-to-cloudinary-using-nextjs-server-side-multer-and-xata-database-3l9f
import { NextApiRequest, NextApiResponse } from "next";
import DatauriParser from 'datauri/parser';

cloudImage.config({
    cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

function generateRandomNumber() {
    return Math.floor(Math.random() * 100000000 + 1);
}
import { CloudImage } from '@/types/cloudinary';

router.use(multer().any()).post(async (req: NextApiRequest, res: NextApiResponse) => {
    // @ts-ignore
    const image = req.files

    // create a new Data URI parser
    const parser = new DatauriParser();
    try {
        const createImage = async (img: any) => {
            const base64Image = parser.format(path.extname(`${img.originalname}_${generateRandomNumber()}`).toString(), img.buffer);
            if (!base64Image || !base64Image.content) {
                throw new Error('Failed generate image');
            }
            try{
                const uploadedImageResponse = await cloudImage.uploader.upload(base64Image.content, { resource_type: 'image', folder: 'fsac' });
                return uploadedImageResponse;
            } catch(err) {
                console.error('error post image' ,err);
                throw new Error('Failed upload image');
            }
        };
        try{
            const createdImage = await createImage(image[0]);
            res.status(200).send({ url: createdImage?.url, width: createdImage?.width, height: createdImage?.height, format: createdImage?.format } as CloudImage)
        }catch(err){
            console.log('error post image' ,err);
            res.status(500).send({ message: 'Internal server error' });
        }
    } catch (err) {
        console.log('error post image' ,err);
    }
})

// disable body parser
export const config = {
    api: {
        bodyParser: false,
    },
};

export default router;