'use client'

import { Dish } from "@prisma/client"
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react"


type DeleteDishType = Pick<Dish, 'id' | 'price' | 'createdAt'>

type DeleteContextT = {
    ids: Set<number>,
    items: DeleteDishType[],
    addId: (item: DeleteDishType) => void,
    removeId: (item: DeleteDishType) => void,
    refreshData: () => void
}

const DeleteItemContext = createContext<DeleteContextT | null>(null)

import React from 'react'

export default function DeleteDishProvider({ children }: {
    children: React.ReactNode
}) {

    const ids = useRef<Set<number>>(new Set([]))
    const items = useRef<DeleteDishType[]>([])

    const addId = useCallback((item: DeleteDishType) => {
        if (!ids.current.has(item.id)) {
            ids.current.add(item.id)
            items.current.push({ ...item })
        }
    }, [])
    const removeId = useCallback((item: DeleteDishType) => {
        if (ids.current.has(item.id)) {
            ids.current.delete(item.id)
            items.current = items.current.filter(i => i.id == item.id)
        }
    }, [])

    const refreshData = useCallback(() => {
        ids.current = new Set();
        items.current = [];
    }, [])

    return (
        <DeleteItemContext.Provider value={{
            ids: ids.current,
            addId,
            removeId,
            items: items.current,
            refreshData,
        }}>
            {children}
        </DeleteItemContext.Provider>
    )
}


export function useDeleteDishes() {
    const [cont, setCont] = useState<DeleteContextT | null>(useContext(DeleteItemContext));
    const state = useContext(DeleteItemContext)
    useEffect(() => {
        if (state) {
            setCont(state)
        }
    }, [state])
    return cont
}