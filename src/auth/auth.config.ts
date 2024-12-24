import bcrypt from 'bcryptjs';
import { AuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';
import credentials from 'next-auth/providers/credentials';

import { SignInSchema } from '@/schema';
import { getUserByEmail } from '@/data/user';
import { Env } from '@/lib/config';

export default {
    providers: [
        Google({
            clientId: Env.GOOGLE_CLIENT_ID,
            clientSecret: Env.GOOGLE_CLIENT_SECRET
        }),
        credentials({
            credentials: {},
            authorize: async (credentials) => {
                const validatedFields = SignInSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;

                    const user = await getUserByEmail(email);

                    if (!user || !user.password) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) {
                        return user;
                    }
                    return null;
                }

                return null;
            }
        })
    ]
} satisfies AuthOptions;
