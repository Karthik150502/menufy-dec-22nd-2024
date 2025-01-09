'use client'
import { S3Handler } from "@/lib/s3/s3-main";

type ItemImageProps = {
    imageFile?: File | null,
    dishImage?: string | null,
    imageKey?: string | null,
    updatedImage?: string | null,
    categoryId: string
}
export async function uploadDishImageS3(data: ItemImageProps) {

    let image;
    let imageKey;
    if (data.dishImage && data.updatedImage !== data.dishImage && data.imageKey) {
        await S3Handler.deletObject(data.imageKey);
    }
    if (data.imageFile) {
        imageKey = `dish-${data.categoryId}-${Date.now()}.jpg`;
        const params = {
            body: data.imageFile as File,
            folder: "dishes/",
            key: imageKey
        };
        image = await S3Handler.uploadObject(params);
    }
    return [image, `dishes/${imageKey}`]
}
