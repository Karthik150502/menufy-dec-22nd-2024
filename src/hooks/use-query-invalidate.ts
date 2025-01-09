'use client'

import { useQueryClient } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react";

export function useInvalidateQueries() {
    const queryClient = useQueryClient();
    const cb = useCallback((queries: (string | number | null | undefined)[]) => {
        queryClient.invalidateQueries({
            queryKey: [...queries]
        })
    }, [queryClient])
    return cb;
}

export function useFetchQuerydata<T>(queryKey: (string | number | undefined)[]) {
    const queryClient = useQueryClient();
    const [data, setData] = useState<T>();
    useEffect(() => {
        if (queryClient) {
            const state = queryClient.getQueryData<T, (string | number | undefined)[], T>(queryKey);
            setData(state);
        }
    }, [queryClient, queryKey])
    return data;
}