'use client'
import { getDishes } from '@/actions/app/fetchData/getDishes'
import { SelectedRestaurant } from '@/store/recoil/restAtom'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useRecoilValue } from 'recoil'
import DishCard from './dishCard'
import CreateDishModal from './createDishModal'
import { useSetRecoilState } from 'recoil'
import { SelectedCategory } from '@/store/recoil/catAtom'
import { getCategory } from '@/actions/app/fetchData/getCategory'
export default function DishesDisplay({
    categoryId
}: {
    categoryId: string,
}) {


    const setCatId = useSetRecoilState(SelectedCategory);
    const rest = useRecoilValue(SelectedRestaurant);
    const { } = useQuery({
        queryKey: ['setCategoryId'],
        queryFn: async () => {
            const res = await getCategory(categoryId)
            setCatId({
                id: res?.id ?? "",
                name: res?.name ?? ""
            })
            return res;
        },
    })
    const { data } = useQuery({
        queryKey: ['dishes', rest?.id, categoryId],
        queryFn: async () => {
            return getDishes(rest?.id ?? 0, categoryId)
        }
    })

    return (
        <div className='w-full border h-[calc(100vh-220px)] rounded-xl grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 shadow-inner p-4 overflow-auto no-scrollbar relative'>
            {
                (data && data.length > 0) ? data.map((dish) => {
                    return <DishCard dish={dish} key={dish.id} />
                }) : <div className='w-fit absolute flex flex-col items-center justify-center gap-2 rounded-lg p-4 inset-x-0 mx-auto top-10'>
                    <p className='text-lg'>No items created</p>
                    <p className='text-xs text-muted-foreground'>Click below to add the first item for this category.</p>
                    <CreateDishModal buttonLabel='Add' categoryId={categoryId} />
                </div>
            }
        </div>
    )
}
