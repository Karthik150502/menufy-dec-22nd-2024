'use client'
import React from 'react'
import TooltipWrapper from './tooltipWrapper'
import { DishStatus as DishStatusPrismaType } from '@prisma/client'
export default function DishStatus({
    status
}: {
    status: DishStatusPrismaType
}) {
    switch (status) {
        case "AVAILABLE":
            return <TooltipWrapper content={"Item is available."}>
                <div className='w-full flex items-center justify-end gap-2 py-1' >
                    <p className='text-xs'>Status</p> <div className='w-4 h-4 rounded-full bg-green-500' />
                </div>
            </TooltipWrapper>
        case "UNAVAILABLE":
            return <TooltipWrapper content={"Item is not available."}>
                <div className='w-full flex items-center justify-end gap-2 py-1' >
                    <p className='text-xs'>Status</p> <div className='w-4 h-4 rounded-full bg-red-500' />
                </div>
            </TooltipWrapper>
        case "INPREPARATION":
            return <TooltipWrapper content={"Item is being prepared."}>
                <div className='w-full flex items-center justify-end gap-2 py-1' >
                    <p className='text-xs'>Status</p> <div className='w-4 h-4 rounded-full bg-yellow-500' />
                </div>
            </TooltipWrapper>
        case "ARCHIVED":
            return <TooltipWrapper content={"Item is Archived, won't be visible to customer."}>
                <div className='w-full flex items-center justify-end gap-2 py-1' >
                    <p className='text-xs'>Status</p> <div className='w-4 h-4 rounded-full bg-blue-600' />
                </div>
            </TooltipWrapper>
        default:
            return null
    }
}
