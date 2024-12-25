'use client'
import React from 'react'

export default function PrimaryLoader({
    status
}: {
    status?: string
}) {
    return (
        <div className='flex flex-col  items-center justify-center gap-4 h-[150px] w-[150px]'>
            <div className='relative w-[40px] h-[40px] animate-spin duration-1000'>
                <div className='border w-[40px] h-[40px] absolute' />
                <div className='border border-white w-[40px] h-[40px] absolute rotate-[30deg]' />
                <div className='border border-primary w-[40px] h-[40px] absolute rotate-[60deg]' />
                <div className='border border-primary_2 w-[40px] h-[40px] absolute rotate-[90deg]' />
                <div className='border border-pink-500 w-[40px] h-[40px] absolute rotate-[150deg]' />
                <div className='border border-purple-500 w-[40px] h-[40px] absolute rotate-[180deg]' />
            </div>
            {status && <p className='text-sm text-muted-foreground'>{status}...</p>}
        </div>
    )
}
