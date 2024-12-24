'use client'
import { getDishes } from '@/actions/app/getDishes'
import { SelectedRestaurant } from '@/store/recoil/restAtom'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useRecoilValue } from 'recoil'
import DishCard from './dishCard'
import { NEXT_DID_POSTPONE_HEADER } from 'next/dist/client/components/app-router-headers'
import { Dish } from '@prisma/client'

export default function DishesDisplay({
    categoryId
}: {
    categoryId: string,
}) {


    const rest = useRecoilValue(SelectedRestaurant)
    const { data } = useQuery({
        queryKey: ['dishes', rest?.id, categoryId],
        queryFn: async () => {
            return getDishes(rest?.id ?? 0, parseInt(categoryId))
        }
    })

    return (
        <div className='w-full h-[calc(100vh-150px)] grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 shadow-inner p-4 rouneded-lg overflow-auto'>
            {
                data && data.map((dish) => {
                    return <DishCard dish={dish} />
                })
            }
        </div>
    )
}
