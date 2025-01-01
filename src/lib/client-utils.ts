"use client"

export function getLS(key: string) {
    return window.localStorage.getItem(key)
}
export function setLS(key: string, value: string) {
    return window.localStorage.setItem(key, value)
}
export function deleteLS(key: string) {
    return window.localStorage.removeItem(key)
}
export function clearLS() {
    return window.localStorage.clear()
}