'use client'
import { useRef, useEffect } from "react";

export function useThrottle<T>(value: T, callback: () => void, delay = 1000) {
    const timer = useRef<NodeJS.Timeout>(setTimeout(() => { }, 0));
    const currentDuration = useRef<number>(0);
    useEffect(() => {
        if ((Date.now() - currentDuration.current) > delay) {
            clearTimeout(timer.current);
            callback();
            currentDuration.current = Date.now()
        }
        return () => {
            clearTimeout(timer.current);
            timer.current = setTimeout(() => {
                callback()
            }, delay)
        }

    }, [value, callback, delay])
}


export function useT<T>(value: T, callback: () => void, delay: number = 1000) {

    const currentDur = useRef<number>(Date.now());
    const timer = useRef<NodeJS.Timeout>(setTimeout(() => { }, 0))

    useEffect(() => {
        if (Date.now() - currentDur.current > delay) {
            clearTimeout(timer.current)
            callback()
            currentDur.current = Date.now();
        }
        return () => {
            if (timer.current) {
                clearTimeout(timer.current)
                timer.current = setTimeout(() => {
                    callback()
                }, delay)
            }
        }

    }, [value, delay, callback])
}