import { TriangleAlert } from 'lucide-react'
import React from 'react'

export default function ErrorDataNotFound() {
    return (
        <div className='flex flex-col text-muted-foreground items-center justify-center gap-2'>
            <TriangleAlert size={18} />
            <p className='text-xs'>Data not found</p>
        </div>
    )
}
