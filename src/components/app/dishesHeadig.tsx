'use client'
import React from 'react'
import { Separator } from '../ui/separator'
import { useRecoilValue } from 'recoil'
import { SelectedCategory } from '@/store/recoil/catAtom'
type Props = {
    heading: string,
    subHeading?: string,
    children?: React.ReactNode
}

export default function DishHeading({ heading, subHeading, children }: Props) {
    const cat = useRecoilValue(SelectedCategory);
    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-start justify-center">
                <div className='flex items-center justify-center gap-2'>
                    <p className="text-2xl font-bold">{heading}</p> <Separator orientation="vertical" className="h-8" /><p className='text-md text-muted-foreground'>{cat?.name}</p>
                </div>
                {
                    subHeading && <p className="text-sm text-muted-foreground">{subHeading}</p>
                }
            </div>
            {children}
        </div>
    )
}
