import React from 'react'
import { redirect } from 'next/navigation'
import DishesDisplay from '@/components/app/dishesDisplay'
import DishHeading from '@/components/app/dishesHeadig'
type Props = {
    searchParams: {
        categoryId?: string
    }
}
export default function DishesPage({ searchParams: {
    categoryId
} }: Props) {
    if (!categoryId) {
        redirect("/dashboard")
    }

    return (
        <div className="h-full flex-1 overflow-hidden relative flex flex-col gap-4 items-start justify-start">
            <DishHeading heading={`Dish`} />
            <div className="w-full flex flex-1 items-start justify-center gap-2">
                <DishesDisplay categoryId={categoryId} />
            </div>
        </div>
    )
}
