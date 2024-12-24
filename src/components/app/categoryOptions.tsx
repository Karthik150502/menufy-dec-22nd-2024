'use client'
import React from 'react'
import { useMenufyOptions } from '@/providers/optionsProvider'

export default function CategoryOptions() {

    const data = useMenufyOptions()

    return (
        <div>{JSON.stringify(data?.categories, null, 4)}</div>
    )
}
