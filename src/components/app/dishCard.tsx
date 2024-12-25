'use client'
import { Category, Dish } from '@prisma/client'
import React from 'react'
import moment from "moment"
import TooltipWrapper from './tooltipWrapper'
import DishStatus from './status'
import DishOptions from './dishOptions'
export default function DishCard({
    dish
}: {
    dish: Dish & {
        category: Pick<Category, "id" | 'name'>
    }
}) {
    return (
        <div className='border text-center rounded-lg flex items-center justify-between shadow-lg p-3 h-[150px] gap-2 py-4'>
            <div className='w-full'>
                <div className='w-[150px] h-[100px] border rounded-lg'></div>
            </div>
            <div className='w-full flex flex-col items-center justify-center gap-2'>
                <div className='w-full flex flex-col items-end justify-center gap-2'>
                    <DishOptions dish={dish} />
                </div>
                <div className='w-full flex flex-col text-[10px] items-right justify-right'>
                    <p className='line-clamp-1 text-right'>{dish.name}</p>
                    <TooltipWrapper content={dish.description}>
                        <p className='line-clamp-2 text-right text-xs'>{dish.description}</p>
                    </TooltipWrapper>
                    <DishStatus status={dish.status} />
                    <p className='line-clamp-1 text-right text-lg'>&#8377;&nbsp;{dish.price ? (dish.price / 100).toFixed(2) : 0}</p>
                    <p className="text-right text-muted-foreground">Added {moment(dish.createdAt).fromNow()}</p>
                </div>
            </div>
        </div>
    )
}
