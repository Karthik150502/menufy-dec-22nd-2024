'use client'
import { S3Handler } from "@/lib/s3/s3-main";
import { getS3ImageKey } from "@/lib/utils";


type Props = {
    imageFile?: File | null,
    dishImage?: string | null,
    updatedImage?: string | null,
    categoryId: string
}

export async function uploadDishImageS3(data: Props) {

    let image;
    if (data.dishImage && data.updatedImage !== data.dishImage) {
        const imageKey = getS3ImageKey(data.dishImage);
        console.log("new image to be uploaded = ", { newImage: data.updatedImage, oldImage: data.dishImage });
        console.log("ImageKey = ", imageKey);
        await S3Handler.deletObject(imageKey);
    }
    if (data.imageFile) {
        const params = {
            body: data.imageFile as File,
            folder: "dishes/",
            key: `dish-${data.categoryId}-${Date.now()}.jpg`
        };
        image = await S3Handler.uploadObject(params);
    }
    return image
}