'use server';

import prisma from '@/lib/prisma/db';
import { getUserById } from '@/data/user';
import { currentUser } from '@/auth/getUserData';
import { getVerificationTokenByUserId } from '@/data/verification-token';

export async function cancelNewEmail() {
  const user = await currentUser();

  if (!user) {
    return { error: 'Unauthorized.' };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: 'Unauthorized.' };
  }

  await prisma.user.update({
    where: {
      id: dbUser.id
    },
    data: {
      tempEmail: null
    }
  });

  const existingToken = await getVerificationTokenByUserId(dbUser.id);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    });
  }

  return { success: 'Email update canceled.' };
}
