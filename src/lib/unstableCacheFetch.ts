import { unstable_cache } from 'next/cache';

export async function unstableCache(cb: () => Promise<any>, key: string) {
    return unstable_cache(cb, [key])
}