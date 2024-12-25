"use client"
import React from 'react'
import { useRecoilValue } from 'recoil'
import { SelectedRestaurant } from '@/store/recoil/restAtom'
export default function CurrentRestaurant() {
    const rest = useRecoilValue(SelectedRestaurant);
    return (
        <div>{rest ? rest.name : ""}</div>
    )
}
