'use client'
import { Category, Dish } from '@prisma/client'
import React from 'react'
import moment from "moment"
import TooltipWrapper from './tooltipWrapper'
import DishStatus from './status'
import DishOptions from './dishOptions'
import Image from 'next/image'
import { Env } from '@/lib/config'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'


type Props = {
    dish: Dish & {
        category: Pick<Category, "id" | 'name'>
    },
    deleteItemActive: boolean,
    checked: boolean,
    onSelectDelete: (id: string) => void
}
export default function DishCard({
    dish,
    deleteItemActive,
    checked,
    onSelectDelete
}: Props) {

    return (
        <div className={cn('border text-center rounded-lg flex items-center justify-between shadow-lg p-3 h-[185px] gap-2 py-4', {
            "cursor-pointer": deleteItemActive

        })}
            onClick={() => {
                onSelectDelete(dish.id)
            }}
        >
            <div className='w-full h-full flex flex-col items-start justify-between gap-2'>

                <div className='w-[150px] h-[100px] border rounded-lg'>
                    <Image src={dish.image ? dish.image : Env.DEFAULT_DISH_IMAGE} height={150} width={100} alt={"Dish Image"} className={cn("w-full h-full border rounded-lg", dish.image ? "object-cover" : "object-contain")} />
                </div>
                <TooltipWrapper content={dish.name}>
                    <p className='w-full line-clamp-2 text-left text-xs'>{dish.name}</p>
                </TooltipWrapper>
            </div>
            <div className='w-full h-full flex flex-col items-center justify-between gap-2'>
                <div className='w-full flex flex-col items-end justify-center gap-2'>
                    {
                        deleteItemActive ? <Checkbox checked={checked} id="select-for-delete" className="w-5 h-5 rounded-lg border-2" /> : <DishOptions dish={dish} />
                    }
                </div>
                <div className='w-full flex flex-col text-[10px] items-right justify-right cursor-pointer'>
                    <TooltipWrapper content={dish.description}>
                        <p className='line-clamp-2 text-right text-xs text-muted-foreground'>{dish.description}</p>
                    </TooltipWrapper>
                    <DishStatus status={dish.status} />
                    <p className='line-clamp-1 text-right text-lg'>&#8377;&nbsp;{dish.price ? (dish.price / 100).toFixed(2) : 0}</p>
                    <p className="text-right text-muted-foreground text-xs">{moment(dish.updatedAt).fromNow()}</p>
                </div>
            </div>
        </div>
    )
}
