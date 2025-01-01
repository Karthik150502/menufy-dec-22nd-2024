import Resizer from "react-image-file-resizer";

export class Compressor {
    private static instance = Resizer;
    private constructor() { }
    static async compressImage(file: File): Promise<string> {
        return new Promise((resolve) => {
            this.instance.imageFileResizer(
                file,
                300,
                300,
                "JPEG",
                70,
                0,
                (uri) => {
                    resolve(uri as string);
                },
                "base64"
            );
        })
    }


    static async urlToFile(url: string, fileName: string, mimeType: string) {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], fileName, { type: mimeType });
    }
}


