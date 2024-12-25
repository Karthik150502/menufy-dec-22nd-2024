'use client'

import React from 'react'
import PrimaryHeading from './primaryHeading'
import { useRecoilValue } from 'recoil'
import { SelectedRestaurant } from '@/store/recoil/restAtom'
export default function CreateBillHeading() {
    const rest = useRecoilValue(SelectedRestaurant);
    return (
        <PrimaryHeading heading='Create a bill' subHeading={rest?.name ? `Create a bill for ${rest.name}` : ``} />
    )
}
