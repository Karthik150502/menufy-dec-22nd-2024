'use client'

import { useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react";

export function useInvalidateQueries() {
    const queryClient = useQueryClient();
    const cb = useCallback((queries: (string | number | null | undefined)[]) => {
        queryClient.invalidateQueries({
            queryKey: [...queries]
        })
    }, [queryClient])
    return cb;
}