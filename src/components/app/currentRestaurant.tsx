"use client"
import React from 'react'
import { useRecoilValue } from 'recoil'
import { SelectedRestaurant } from '@/store/recoil/restAtom'
import LoaderCmp from './loader'
export default function CurrentRestaurant() {
    const rest = useRecoilValue(SelectedRestaurant);
    return (
        <div className='flex items-center justify-center gap-2'>
            {
                rest ? <>
                    <p>
                        {rest.name}
                    </p>
                </> : <LoaderCmp />
            }
        </div>
    )
}
