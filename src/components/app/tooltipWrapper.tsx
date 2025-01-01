'use client'
import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip";

type Props = {
    content: string | null,
    children: React.ReactNode,
    side?: "top" | "bottom" | "left" | "right"
}

export default function TooltipWrapper({ content, children, side = "top" }: Props) {
    if (!content) {
        return children
    }

    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} className='text-[10px] font-thin'>
                    {content}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
