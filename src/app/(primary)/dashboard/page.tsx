'use client'
import ImageUploader from '@/components/app/imageUploader'
import PrimaryHeading from '@/components/app/primaryHeading'
import React from 'react'

export default function DashboardPage() {
    return (
        <div className="h-full flex-1 overflow-hidden relative flex flex-col gap-4 items-start justify-start">
            <PrimaryHeading heading='Dashboard' />
            <div className="w-full flex flex-1 items-center justify-center gap-2">
                <ImageUploader />
            </div>
        </div>
    )
}
