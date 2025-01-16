import { UserRole } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { AuthOptions } from 'next-auth';
import prisma from '@/lib/prisma/db';
import authConfig from './auth.config';
import { getUserById } from '@/data/user';
import { getAccountByUserId } from '@/data/account';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';
import { initializeUser } from '@/actions/initializeUser';

export const authOptions: AuthOptions = {
    pages: {
        signIn: '/auth/sign-in',
        error: '/auth/error'
    },
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    emailVerified: new Date()
                }
            });
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            // Skip email verification check for OAuth
            if (account?.provider !== 'credentials') {
                return true;
            }
            // Prevent unverified email sign in
            const existingUser = await getUserById(user.id);
            if (!existingUser?.emailVerified) {
                return false;
            }
            // Check if 2FA enabled
            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
                    existingUser.id
                );
                // Prevent unconfirmed 2FA sign in
                if (!twoFactorConfirmation) {
                    return false;
                }
                // Delete 2FA confirmation for next sign in
                await prisma.twoFactorConfirmation.delete({
                    where: {
                        id: twoFactorConfirmation.id
                    }
                });
            }
            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }

            if (session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
            }

            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.tempEmail = token.tempEmail as string | null;
                session.user.isOAuth = token.isOAuth as boolean;
                session.user.image = token.picture as string
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) {
                return token;
            }

            const existingUser = await getUserById(token.sub);

            if (!existingUser) {
                return token;
            }

            if (!existingUser.userDataInitialized) {
                initializeUser(existingUser)
            }

            const existingAccount = await getAccountByUserId(existingUser.id);

            token.isOAuth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.tempEmail = existingUser.tempEmail;
            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
            token.picture = existingUser.image
            return token;
        }
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    ...authConfig
} satisfies AuthOptions