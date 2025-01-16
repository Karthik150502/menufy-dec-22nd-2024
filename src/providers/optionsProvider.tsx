'use client'
import { CategoryOptionsType, OptionsType, RestaurantOptionsType } from '@/types/optionsProvider'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import { useSession } from 'next-auth/react'
import { getOptions } from '@/actions/app/fetchData/getOptions'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { SelectedRestaurant } from '@/store/recoil/restAtom'
import { getCategories } from '@/actions/app/fetchData/getCategories'
import { useRouter } from 'next/navigation'
import { SelectedCategory } from '@/store/recoil/catAtom'
import { getLS, setLS } from '@/lib/client-utils'

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
    const router = useRouter()
    const [rest, setSelcRest] = useRecoilState(SelectedRestaurant);
    const setCat = useSetRecoilState(SelectedCategory);

    const { data: categories, isPending: catgoriesPending, isError: categoriesError } = useQuery<CategoryOptionsType>({
        queryKey: ['categories', rest?.id],
        queryFn: async () => {
            const res = await getCategories(rest?.id);

            if (res.categories && res.categories.length) {
                const cat = res.categories[0];
                setCat({
                    id: cat.id,
                    name: cat.name
                })
                router.push(`/dishes?restId=${rest?.id}&categoryId=${cat.id}`)
            } else {
                router.push(`/dashboard`)
            }
            return res
        },
        enabled: !!rest?.id, // Run query only if `rest?.id` is truthy,
        refetchOnWindowFocus: false, // Do not refetch when window gains focus
    })
    const { data, isPending, isError } = useQuery<RestaurantOptionsType>({
        queryKey: ['menufyOpts', session?.user.id],
        queryFn: async () => {
            const res = await getOptions();
            const activeRest = getLS("menufy/active-rest");
            if (!activeRest) {
                if (res.restaurants && res.restaurants.length > 0) {
                    const { id, name } = res.restaurants[0]
                    const value = `${id}:${name}`;
                    setSelcRest({
                        id, name
                    })
                    setLS("menufy/active-rest", value);
                }
            } else {
                const [id, name] = activeRest.split(":");
                setSelcRest({
                    id: parseInt(id), name
                })
            }
            return res
        },
        enabled: !!session?.user.id,
        refetchOnWindowFocus: false,
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