'use server';

import { UserRole } from '@prisma/client';

import { currentRole } from '@/auth/getUserData';

export async function admin() {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: 'Server action allowed.' };
  }

  return { error: 'Server action forbidden.' };
}
