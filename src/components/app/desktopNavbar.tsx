"use client"
import React, { useState } from 'react'
import { Brand } from '../auth/brand'
import { Button } from '@/components/ui/button'
export default function DesktopNavbar() {
    const [open, setOpen] = useState<boolean>(true);
    return (
        <section className='absolute left-2 my-auto h-[calc(100vh-16px)] rounded-2xl w-[85px] border inset-y-0'>
            <Brand size='lg' />
            <Button
                onClick={() => setOpen(!open)}
            >
                {       
                    open ? "close" : "open"
                }
            </Button>
        </section>
    )
}
