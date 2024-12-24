"use client"

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

export default function NextAuthSessisonProvider({
    session,
    children
}: {
    session: Session | null,
    children: ReactNode
}) {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}
