import NextAuth from 'next-auth';
import { authOptions } from '@/auth/auth';
const nextAuthHandler = NextAuth(authOptions);
export default nextAuthHandler;

export const {
    auth,
    signIn,
    signOut,
    update
} = nextAuthHandler
