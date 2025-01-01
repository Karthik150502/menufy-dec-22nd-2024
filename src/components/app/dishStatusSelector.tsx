'use client'

import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DishConfigType, DishStatusLabel } from '@/lib/config/dish/status'
import { Button } from '../ui/button'
import { DishStatus } from '@prisma/client'

type Props = {
    value: DishStatus,
    onChange: (val: DishStatus) => void,
    disabled?: boolean
}
export default function DishStatusSelector({ value, onChange, disabled }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"outline"} disabled={!!disabled}>
                    <StatusLabel value={value} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className='text-xs'>Select</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {
                    Object.entries(DishStatusLabel).map(([key,]) => {
                        return <DropdownMenuItem key={key} onClick={() => {
                            onChange(key as DishStatus)
                        }}>
                            <StatusLabel value={key as DishStatus} />
                        </DropdownMenuItem>
                    })
                }
            </DropdownMenuContent>
        </DropdownMenu >
    )
}





function StatusLabel({
    value
}: {
    value: DishStatus
}) {
    const option: DishConfigType = DishStatusLabel[value]
    return <div className='flex items-center justify-center gap-2'>
        <p>{option.label}</p>
        <option.icon className={option.iconStyle} />
    </div>
}