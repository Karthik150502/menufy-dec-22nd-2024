'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useMemo } from "react";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    const queryClient = useMemo<QueryClient>(() => new QueryClient(), []);

    return (
        <QueryClientProvider client={queryClient} >
            {children}
        </QueryClientProvider>
    )
}
