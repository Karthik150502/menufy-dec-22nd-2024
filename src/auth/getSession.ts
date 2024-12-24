import { authOptions } from "@/auth/auth";
import { getServerSession } from "next-auth";

export async function getSession() {
    return getServerSession(authOptions)
}