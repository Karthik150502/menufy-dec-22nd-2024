'use client'
import { Dish } from '@prisma/client'
import React from 'react'

export default function DishCard({
    dish
}: {
    dish: Dish
}) {
    return (
        <div className='border text-center rounded-lg flex items-center justify-center shadow-lg p-3'>{JSON.stringify(dish, null, 4)}</div>
    )
}
