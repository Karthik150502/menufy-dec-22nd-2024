"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import React from 'react'
import EditDishForm from "./editDishForm"
import { Dish } from "@prisma/client"

export default function EditDishModal({
    dish,
    open,
    setOpen
}: {
    dish: Dish,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="lg:w-[500px] md:w-[400px] sm:w-[360px] max-h-[90dvh] overflow-auto scrollbar">
                <DialogHeader>
                    <DialogTitle>Edit Item</DialogTitle>
                    <DialogDescription className='text-xs'>
                        Edit &quot;{dish.name}&quot;
                    </DialogDescription>
                </DialogHeader>
                <EditDishForm dish={dish} setDialogOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
}
