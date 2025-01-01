import { S3 } from "./s3";
import { S3 as AWS_S3, config as AWS_Config } from "aws-sdk"
import { S3UploadParams } from "./s3";
import { Env } from "../config";

AWS_Config.update({
    accessKeyId: Env.AWS_S3_ACCESS_KEY,
    secretAccessKey: Env.AWS_S3_SECRET_ACCESS_KEY,
})

export class S3Handler implements S3 {

    private static instance: S3Handler = new S3Handler();
    private static s3Instance: AWS_S3 = new AWS_S3({
        params: {
            Bucket: Env.AWS_S3_BUCKET_NAME
        },
        region: Env.AWS_S3_REGION_NAME
    });

    private constructor() {
        AWS_Config.update({
            accessKeyId: Env.AWS_S3_ACCESS_KEY,
            secretAccessKey: Env.AWS_S3_SECRET_ACCESS_KEY,
        })
        S3Handler.s3Instance = new AWS_S3({
            params: {
                Bucket: Env.AWS_S3_BUCKET_NAME
            },
            region: Env.AWS_S3_REGION_NAME
        })
    }

    public static getInstance() {
        return this.instance;
    }

    public static async uploadObject(data: S3UploadParams): Promise<string> {
        const fileKey = data.folder + data.key
        const params = {
            Bucket: Env.AWS_S3_BUCKET_NAME,
            Key: fileKey,
            Body: data.body,
        }
        const response = await S3Handler.s3Instance.upload(params).promise()
        return response.Location;
    }

    public static async deletObject(fileKey: string): Promise<void | true> {
        const params = {
            Bucket: Env.AWS_S3_BUCKET_NAME as string,
            Key: fileKey,
        }
        try {
            await S3Handler.s3Instance.deleteObject(params).promise()
            return true
        } catch (e) {
            console.log("Error from S3 Handler: ", e)
            throw new Error("Unable to delete the object")
        }
    }
}

