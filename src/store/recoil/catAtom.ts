'use client'
import { atom } from "recoil"


export const SelectedCategory = atom<{
    id: string,
    name: string
} | null>({
    key: 'SelectedCategory',
    default: null
})