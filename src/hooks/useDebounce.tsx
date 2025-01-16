'use client'
import { useEffect, useRef } from "react";

export function useDebounce<T>(value: T, cb: () => void, delay: number) {
    const timer = useRef<NodeJS.Timeout>(setTimeout(() => { }, 0));
    useEffect(() => {
        timer.current = setTimeout(() => {
            cb();
        }, delay)   
        return () => {
            clearTimeout(timer.current);
        }
    }, [value, cb, delay])
}


