'use client'

import { Loader } from 'lucide-react'
import React from 'react'

export default function LoaderCmp() {
    return (
        <div className="w-full py-2 flex items-center justify-center">
            <Loader size={18} className="animate-spin stroke-muted-foreground" />
        </div>
    )
}
