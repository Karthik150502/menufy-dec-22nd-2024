'use client'

import React, { useRef, useState } from 'react'
import { Input } from '../ui/input'
import Image from 'next/image'
import { Camera, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import { Compressor } from '@/lib/compress';
import TooltipWrapper from './tooltipWrapper'

type Props = {
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
        ?: string | null,
    // setImage: React.Dispatch<React.SetStateAction<string | null>>
}

export default function ImageUploader({ setFile, defaultImg }: Props) {

    const imageRef = useRef<HTMLImageElement | null>(null);
    const [imgSrc, setImgSrc] = useState<string>(defaultImg ? defaultImg : "");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    return (
        <div className='w-[200px] h-[150px] border rounded-lg flex flex-col items-center justify-between gap-2 py-4 relative'>
            {
                <div className='w-[150px] h-[100px] overflow-hidden rounded-xl'>
                    <Image ref={imageRef} src={imgSrc ? imgSrc : "https://cdn-icons-png.flaticon.com/128/18567/18567001.png"} height={150} width={100} alt={"Profile Image"} className='object-cover w-full h-full border rounded-lg'
                    />
                </div>
            }
            <Input ref={inputRef} className='absolute hidden' type="file" onChange={async (e) => {
                setIsLoading(true)
                if (e.target.files?.length && imageRef.current) {
                    try {
                        const file = e.target.files[0];
                        const fileName = file.name;
                        const fileType = file.type;
                        const url = await Compressor.compressImage(e.target.files[0]);
                        setImgSrc(url);
                        const updatedFile = await Compressor.urlToFile(url, fileName, fileType);
                        setFile(updatedFile)
                    } catch (e) {
                        console.log("Cannot compress the image: ", e);
                    } finally {
                        setIsLoading(false)
                    }
                }
            }} />

            <TooltipWrapper content={imgSrc ? "Delete image" : "Click to upload"}>
                {
                    imgSrc ? <Button type="button" disabled={isLoading} variant={"outline"} size={"icon"} className='rounded-full absolute -bottom-6' onClick={() => {
                        setImgSrc("")
                    }}>
                        <Trash className="stroke-red-500" size={20} strokeWidth={1} />
                    </Button> : <Button type="button" variant={"outline"} size={"icon"} className='rounded-full absolute -bottom-6' onClick={() => {
                        inputRef.current?.click()
                    }}>
                        <Camera size={20} strokeWidth={1} />
                    </Button>
                }
            </TooltipWrapper>
        </div>
    )
}
