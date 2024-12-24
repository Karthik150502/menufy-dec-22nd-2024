'use client'
import React from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'
export default function SignOutBtn({ label = "Sign Out" }: { label?: string }) {
    return (
        <Button
            onClick={() => {
                signOut()
            }}
        >
            {label}
        </Button>
    )
}
