'use client'
import { getDishes } from '@/actions/app/fetchData/getDishes'
import { SelectedRestaurant } from '@/store/recoil/restAtom'
import { useQuery } from '@tanstack/react-query'
import React, { useCallback, useState } from 'react'
import { useRecoilValue } from 'recoil'
import DishCard from './dishCard'
import CreateDishModal from './createDishModal'
import { useSetRecoilState } from 'recoil'
import { SelectedCategory } from '@/store/recoil/catAtom'
import { DeleteItemActive } from '@/store/recoil/itemDeleteActiveAtom'
import DeleteItemActiveToggle from './deleteItemActiveToggle'
export default function DishesDisplay({
    categoryId
}: {
    categoryId: string,
}) {
    const setCatId = useSetRecoilState(SelectedCategory);
    const [idsToDelete, setIdsToDelete] = useState<Set<string>>(new Set([]));
    const [allSelect, setAllSelect] = useState<boolean>(false)
    const rest = useRecoilValue(SelectedRestaurant);
    const deleteItemActive = useRecoilValue(DeleteItemActive);

    const { data } = useQuery({
        queryKey: ['dishes', rest?.id, categoryId],
        queryFn: async () => {
            return getDishes(rest?.id ?? 0, categoryId)
        }
    })


    const checkAllSelc = useCallback((ids: Set<string>) => {
        if (ids.size === data?.length) {
            setAllSelect(true)
        } else {
            setAllSelect(false)
        }
        setIdsToDelete(new Set(ids))
    }, [setAllSelect, data])

    const selectItemDelete = useCallback((id: string) => {
        if (idsToDelete.has(id)) {
            idsToDelete.delete(id)
        } else {
            idsToDelete.add(id)
        }
        checkAllSelc(idsToDelete)
    }, [idsToDelete, checkAllSelc])

    const refreshData = useCallback(() => {
        setIdsToDelete(new Set<string>())
        setAllSelect(false)
    }, [setAllSelect])

    const onSelectAll = useCallback(() => {
        if (!data) { return; }
        if (allSelect) {
            setIdsToDelete(new Set<string>());
            setAllSelect(false)
        } else {
            const ids = new Set<string>();
            data.forEach(item => {
                ids.add(item.id)
            })
            setIdsToDelete(ids);
            setAllSelect(true)
        }
    }, [allSelect, data])
    return (
        <div className='w-full h-[calc(100vh-220px)] flex flex-col items-center justify-start gap-1'>
            <div className="h-[45px] flex items-center gap-2 justify-between w-full p-2">
                <DeleteItemActiveToggle
                    onDelete={() => {
                        console.log("Ids to delete: ", idsToDelete)
                    }}
                    onCancel={refreshData}
                    allSelect={allSelect}
                    onSelectAll={onSelectAll}
                />
                <CreateDishModal categoryId={categoryId} />
            </div>
            <div className='w-full border h-[calc(100vh-265px)] rounded-xl grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 shadow-inner p-4 overflow-auto no-scrollbar relative'>
                {
                    (data && data.length > 0) ? data.map((dish) => {
                        return <DishCard
                            key={dish.id}
                            deleteItemActive={deleteItemActive}
                            dish={dish}
                            checked={idsToDelete.has(dish.id)}
                            onSelectDelete={selectItemDelete}
                        />
                    }) : <div className='w-fit absolute flex flex-col items-center justify-center gap-2 rounded-lg p-4 inset-x-0 mx-auto top-10'>
                        <p className='text-lg'>No items created</p>
                        <p className='text-xs text-muted-foreground'>Click below to add the first item for this category.</p>
                        <CreateDishModal buttonLabel='Add' categoryId={categoryId} />
                    </div>
                }
            </div>
        </div>
    )
}
