import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadCloudinary = async (localFile) => {
    try {
        if (!localFile) return null;
        const response = await cloudinary.uploader.upload(localFile, {
            resource_type: "auto"
        })
        // File uploaded successfully
        // console.log("Response :: ", response)
        // console.log("File uploaded Successfully", response.url)
        fs.unlinkSync(localFile)
        return response;
    } catch (error) {
        fs.unlinkSync(localFile) // remove the locally saved file as the upload operation got failed
        return null;
    }
}

// Upload an image
//  const uploadResult = await cloudinary.uploader
//    .upload(
//        'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//            public_id: 'shoes',
//        }
//    )
//    .catch((error) => {
//        console.log(error);
//    });

// console.log(uploadResult);

export { uploadCloudinary }