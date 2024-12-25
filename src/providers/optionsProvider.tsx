'use client'
import { CategoryOptionsType, OptionsType, RestaurantOptionsType } from '@/types/optionsProvider'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import { useSession } from 'next-auth/react'
import { getOptions } from '@/actions/app/fetchData/getOptions'
import { useRecoilState } from 'recoil'
import { SelectedRestaurant } from '@/store/recoil/restAtom'
import { getCategories } from '@/actions/app/fetchData/getCategories'

export type ContextType = OptionsType & {
    isPending?: boolean,
    isError?: boolean,
    catgoriesPending?: boolean,
    categoriesError?: boolean
} | null | undefined;

const MenufyOptContext = createContext<ContextType>(null)

export default function MenufyOptsProvider({ children }: {
    children: React.ReactNode
}) {
    const { data: session } = useSession();
    const [rest, setSelcRest] = useRecoilState(SelectedRestaurant);

    const { data: categories, isPending: catgoriesPending, isError: categoriesError } = useQuery<CategoryOptionsType>({
        queryKey: ['categories', rest?.id],
        queryFn: async () => await getCategories(rest?.id)
    })
    const { data, isPending, isError } = useQuery<RestaurantOptionsType>({
        queryKey: ['menufyOpts', session?.user.id],
        queryFn: async () => {
            const res = await getOptions()
            const activeRest = window.localStorage.getItem("menufy/active-rest");
            if (!activeRest) {
                if (res.restaurants && res.restaurants.length > 0) {
                    const { id, name } = res.restaurants[0]
                    const value = `${id}:${name}`;
                    setSelcRest({
                        id, name
                    })
                    window.localStorage.setItem("menufy/active-rest", value);
                }
            } else {
                const [id, name] = activeRest.split(":");
                setSelcRest({
                    id: parseInt(id), name
                })
            }
            return res
        },
    })
    return (
        <MenufyOptContext.Provider value={{ ...{ ...data, ...categories }, catgoriesPending, categoriesError, isPending, isError }}>
            {children}
        </MenufyOptContext.Provider >
    )
}


export function useMenufyOptions(): ContextType | null {
    const [state, setState] = useState<ContextType | null>(null)
    const contextState = useContext(MenufyOptContext);
    useEffect(() => {
        setState(contextState)
    }, [contextState])
    return state
}