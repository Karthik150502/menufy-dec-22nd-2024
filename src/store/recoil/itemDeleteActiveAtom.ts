'use client'
import { atom } from "recoil"

export const DeleteItemActive = atom<boolean>({
    key: 'DeleteItemActive',
    default: false
})