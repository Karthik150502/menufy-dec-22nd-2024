import AXIOS from "axios"
import { Env } from "./config";


const axiosClientSingleton = () => {
    return AXIOS.create({
        baseURL: Env.APP_URL
    })
}

declare const globalThis: {
    axiosGlobal: ReturnType<typeof axiosClientSingleton>;
} & typeof global;

const axios = globalThis.axiosGlobal ?? axiosClientSingleton()

export default axios

if (process.env.NODE_ENV !== 'production') globalThis.axiosGlobal = axios


