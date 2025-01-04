'use client'

import React, { useRef, useState } from 'react'
import { Input } from '../ui/input'
import Image from 'next/image'
import { Pen, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import { Compressor } from '@/lib/compress';
import TooltipWrapper from './tooltipWrapper'

type Props = {
    setFile: (file: File | null) => void,
    image?: string | null,
    setImage: (url: string) => void,
    name?: string | null
}

export default function ProfileImageUploader({ setFile, image, setImage, name }: Props) {

    const imageRef = useRef<HTMLImageElement | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    return (
        <div className='w-[200px] h-[150px] border rounded-lg flex flex-col items-center justify-between gap-2 py-4 relative'>
            {
                <div className='w-full relative flex flex-col items-center justify-canter gap-2'>
                    <Image ref={imageRef} alt={name ? name : "User profile pic"} src={image ? image : "https://cdn-icons-png.flaticon.com/128/847/847969.png"} height={100} width={100} className='rounded-full h-[100px] w-[100px]' />
                    <TooltipWrapper content={image ? "Delete image" : "Click to upload"}>
                        {
                            image ? <Button type="button" disabled={isLoading} variant={"outline"} size={"icon"} className='rounded-full absolute -bottom-6' onClick={() => {
                                setImage("")
                                setFile(null)
                            }}>
                                <Trash className="stroke-red-500" size={15} strokeWidth={1} />
                            </Button> : <Button type="button" variant={"outline"} size={"icon"} className='rounded-full absolute -bottom-6' onClick={() => {
                                inputRef.current?.click()
                            }}>
                                <Pen size={15} strokeWidth={1} />
                            </Button>
                        }
                    </TooltipWrapper>
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
                        setImage(url)
                        const updatedFile = await Compressor.urlToFile(url, fileName, fileType);
                        setFile(updatedFile)
                    } catch (e) {
                        console.log("Cannot compress the image: ", e);
                    } finally {
                        setIsLoading(false)
                    }
                }
            }} />
        </div>
    )
}
