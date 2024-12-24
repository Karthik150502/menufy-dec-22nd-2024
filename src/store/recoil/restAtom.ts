'use client'
import { atom } from "recoil"


export const SelectedRestaurant = atom<{
    id: number,
    name: string
} | null>({
    key: 'SelectedRestaurant',
    default: null
})