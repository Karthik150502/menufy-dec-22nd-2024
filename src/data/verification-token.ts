import prisma from '@/lib/prisma/db';

export async function getVerificationTokenByToken(token: string) {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        token
      }
    });

    return verificationToken;
  } catch {
    return null;
  }
}

export async function getVerificationTokenByUserId(userId: string) {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        userId
      }
    });

    return verificationToken;
  } catch {
    return null;
  }
}
