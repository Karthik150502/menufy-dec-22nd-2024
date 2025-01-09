"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React, { useState } from 'react'
import { Button } from "../ui/button"
import { Plus } from "lucide-react"
import CreateDishForm from "./createDishForm";

export default function CreateDishModal({
    categoryId,
    buttonLabel
}: {
    categoryId: string,
    buttonLabel?: string
}) {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"} size={"sm"} className="text-xs">
                    <Plus size={18} />
                    {buttonLabel ?? "Add Item/ Dish"}
                </Button>
            </DialogTrigger>
            <DialogContent className="lg:w-[500px] md:w-[400px] sm:w-[360px] max-h-[90dvh] overflow-auto scrollbar">
                <DialogHeader>
                    <DialogTitle>Add Item</DialogTitle>
                    <DialogDescription className='text-xs'>
                        Add this Item for your customers
                    </DialogDescription>
                </DialogHeader>
                <CreateDishForm categoryId={categoryId} setDialogOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
}
