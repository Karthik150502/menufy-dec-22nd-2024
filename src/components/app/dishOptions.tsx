"use client"
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button'
import { Ellipsis } from 'lucide-react'
import TooltipWrapper from './tooltipWrapper'
import DishDeleteModal from './dishDeleteModal'
import { Dish } from '@prisma/client'

export default function DishOptions({
    dish
}: {
    dish: Dish
}) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <TooltipWrapper content={"Actions"}>
                <DropdownMenuTrigger asChild>
                    <Button variant={"outline"} size={"icon"}>
                        <Ellipsis />
                    </Button>
                </DropdownMenuTrigger>
            </TooltipWrapper>
            <DropdownMenuContent>
                <DropdownMenuLabel className='text-xs'>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='text-xs'>Edit</DropdownMenuItem>
                <DishDeleteModal id={dish.id} />
            </DropdownMenuContent>
        </DropdownMenu >
    )
}
