'use server';

import * as z from 'zod';
import bcrypt, { compare } from 'bcryptjs';

import prisma from '@/lib/prisma/db';
import { update } from '@/auth';
import { getUserById } from '@/data/user';
import { UpdatePasswordSchema } from '@/schema';
import { currentUser } from '@/auth/getUserData';
import { revalidatePath } from 'next/cache';

export async function updatePassword(
  values: z.infer<typeof UpdatePasswordSchema>
) {
  const user = await currentUser();

  if (!user) {
    return { error: 'Unauthorized.' };
  }

  if (user.isOAuth) {
    return { error: 'Unauthorized.' };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || !dbUser.password) {
    return { error: 'Unauthorized.' };
  }

  const passwordsMatch = await compare(values.currentPassword, dbUser.password);

  if (!passwordsMatch) {
    return { error: 'Incorrect password.' };
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(values.newPassword, salt);

  const updatedUser = await prisma.user.update({
    where: {
      id: dbUser.id
    },
    data: {
      password: hashedPassword
    }
  });

  update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
      role: updatedUser.role
    }
  });


  return { success: 'Password updated.' };
}
