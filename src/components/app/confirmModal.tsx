'use client'
import React, { ReactNode, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button';

type Props = {
    label: string,
    description?: string,
    onCancelAction?: () => void,
    onConfirmAction: () => void,
    children: ReactNode,
    onConfirmVariant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null,
    onCancelVariant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null,
}

export default function ConfirmModal({
    label,
    description,
    onCancelAction,
    onConfirmAction,
    children,
    onConfirmVariant,
    onCancelVariant
}: Props) {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{label}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='flex items-center justify-center gap-2'>
                    <Button
                        variant={onCancelVariant ? onCancelVariant : "outline"}
                        onClick={() => {
                            if (onCancelAction) {
                                onCancelAction()
                            }
                            setOpen(false);
                        }}
                    >Cancel</Button>
                    <Button
                        variant={onConfirmVariant ? onConfirmVariant : "default"}
                        onClick={() => {
                            onConfirmAction()
                            setOpen(false);
                        }}
                    >Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}
