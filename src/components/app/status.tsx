'use client'
import React from 'react'
import TooltipWrapper from './tooltipWrapper'
export default function DishStatus({
    status
}: {
    status: "AVAILABLE" | "UNAVAILABLE" | "INPREPARATION"
}) {
    switch (status) {
        case "AVAILABLE":
            return <TooltipWrapper content={"Dish is available to serve."}>
                <div className='w-full flex items-center justify-end gap-2 py-1' >
                    <p>Status</p> <div className='w-4 h-4 rounded-full bg-green-500' />
                </div>
            </TooltipWrapper>
        case "UNAVAILABLE":
            return <TooltipWrapper content={"Dish is not available to serve."}>
                <div className='w-full flex items-center justify-end gap-2 py-1' >
                    <p>Status</p> <div className='w-4 h-4 rounded-full bg-red-500' />
                </div>
            </TooltipWrapper>
        case "INPREPARATION":
            return <TooltipWrapper content={"Dish is gettig prepared to serve."}>
                <div className='w-full flex items-center justify-end gap-2 py-1' >
                    <p>Status</p> <div className='w-4 h-4 rounded-full bg-yellow-500' />
                </div>
            </TooltipWrapper>
        default:
            return null
    }
}
