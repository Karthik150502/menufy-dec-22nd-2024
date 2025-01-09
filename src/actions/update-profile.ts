'use server';

import * as z from 'zod';

import prisma from '@/lib/prisma/db';
import { UpdateProfileSchema } from '@/schema';
import { sendVerificationEmail } from '@/lib/mail';
import { currentUser } from '@/auth/getUserData';
import { generateVerificationToken } from '@/lib/tokens';
import { getUserByEmail, getUserById } from '@/data/user';
import { revalidatePath } from 'next/cache';

export async function updateProfile(
  values: z.infer<typeof UpdateProfileSchema>
) {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized")
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    throw new Error("Unauthorized")
  }

  let updateEmail = false;

  if (values.email && values.email !== user.email) {
    updateEmail = true;
  }

  if (updateEmail) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      throw new Error("Email already exists.")
    }

    const verificationToken = await generateVerificationToken(dbUser.id, true);

    await sendVerificationEmail(
      values.name,
      values.email,
      verificationToken.token
    );
  }


  const updatedUser = {
    name: values.name,
    tempEmail: user.isOAuth || !updateEmail ? undefined : values.email,
    role: values.role,
    isTwoFactorEnabled: user.isOAuth ? undefined : values.isTwoFactorEnabled,
    image: values.image
  }
  await prisma.user.update({
    where: {
      id: dbUser.id
    },
    data: updatedUser
  });

  revalidatePath("/settings")

  return {
    updatedUser, updateEmail: updateEmail ? 'Profile updated & verification email sent.' : 'Profile updated.'
  }
}
