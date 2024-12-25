import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function NotfoundPage() {
    return (
        <div className="min-h-screen overflow-hidden relative flex flex-col gap-4 items-center justify-center p-4">
            <div className="text-center flex flex-col items-center justify-center gap-2">
                <p className="text-4xl font-bold">oops, 404, Page not found</p>
                <p className="text-muted-foreground text-xm">The page you are looking for is not present</p>
            </div>
            <div className="flex items-center justify-center gap-2">
                <Button>
                    <Link href={"/dashboard"}>
                        To Dashboard
                    </Link>
                </Button>
            </div>
        </div>
    )
}
