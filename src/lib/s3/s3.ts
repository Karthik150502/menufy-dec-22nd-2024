export type S3UploadParams = {
    key: string,
    body: File,
    folder: string
}

export abstract class S3 {
    public static uploadObject(): void { }
    public static deletObject(): void { }
    public static getUrl() { }
}