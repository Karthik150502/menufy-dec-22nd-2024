'use client'
import { S3Handler } from "@/lib/s3/s3-main";
import { getS3ImageKey } from "@/lib/utils";

type ProfileImageProps = {
    imageFile?: File | null,
    profileImage?: string | null,
    updatedImage?: string | null,
    userId?: string | null
}

export async function uploadProfileImageS3(data: ProfileImageProps) {
    let image;
    if (data.userId && data.profileImage && data.updatedImage !== data.profileImage) {
        const imageKey = getS3ImageKey(data.profileImage);
        await S3Handler.deletObject(imageKey);
    }
    if (data.imageFile) {
        const params = {
            body: data.imageFile as File,
            folder: "user-image/",
            key: `${data.userId}-${Date.now()}.jpg`
        };
        image = await S3Handler.uploadObject(params);
    }
    return image ? image : data.profileImage
}