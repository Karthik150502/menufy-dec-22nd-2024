'use client'
import { getDishes } from '@/actions/app/fetchData/getDishes'
import { SelectedRestaurant } from '@/store/recoil/restAtom'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useRecoilValue } from 'recoil'
import DishCard from './dishCard'

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
        <div className='w-full h-[calc(100vh-150px)] grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 shadow-inner p-4 rouneded-lg overflow-auto no-scrollbar'>
            {
                data && data.map((dish) => {
                    return <DishCard dish={dish} key={dish.id} />
                })
            }
        </div>
    )
}
