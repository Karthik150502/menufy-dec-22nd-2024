import { Resend } from 'resend';

import { PasswordReset } from '@/components/emails/password-reset';
import { EmailVerification } from '@/components/emails/email-verification';
import { TwoFactorAuthentication } from '@/components/emails/two-factor-authentication';

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.AUTH_URL;

export async function sendVerificationEmail(
  name: string | null,
  email: string,
  token: string
) {
  const verifyLink = `${domain}/auth/email-verification?token=${token}`;

  const response = await resend.emails.send({
    from: 'decimalight.in@resend.dev',
    to: [email],
    subject: 'Email Verification',
    react: EmailVerification({ name, verifyLink })
  });
  console.log("Email response = ", response);
}

export async function sendPasswordResetEmail(
  name: string | null,
  email: string,
  token: string
) {
  const resetLink = `${domain}/auth/reset-password?token=${token}`;

  await resend.emails.send({
    from: 'decimalight.in',
    to: [email],
    subject: 'Password Reset',
    react: PasswordReset({ name, resetLink })
  });
}

export async function sendTwoFactorTokenEmail(
  name: string | null,
  email: string,
  token: string
) {
  await resend.emails.send({
    from: 'karthikrdy150502@gmail.com',
    to: [email],
    subject: 'Two Factor Authentication Code',
    react: TwoFactorAuthentication({ name, token })
  });
}
