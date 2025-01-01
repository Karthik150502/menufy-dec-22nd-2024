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
import EditDishModal from './editDishModal'

export default function DishOptions({
    dish
}: {
    dish: Dish
}) {

    const [delModalOpen, setDelModalOpen] = useState<boolean>(false);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

    return (
        <>
            <DishDeleteModal open={delModalOpen} setOpen={setDelModalOpen} id={dish.id} categoryId={dish.categoryId} name={dish.name} />
            <EditDishModal dish={dish} open={editModalOpen} setOpen={setEditModalOpen} />
            <DropdownMenu>
                <TooltipWrapper content={"options"}>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"outline"} size={"icon"}>
                            <Ellipsis />
                        </Button>
                    </DropdownMenuTrigger>
                </TooltipWrapper>
                <DropdownMenuContent>
                    <DropdownMenuLabel className='text-xs'>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className='text-xs'
                        onClick={() => setEditModalOpen(true)}
                    >Edit</DropdownMenuItem>
                    <DropdownMenuItem className='text-xs'
                        onClick={() => setDelModalOpen(true)}
                    >Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu >
        </>
    )
}
