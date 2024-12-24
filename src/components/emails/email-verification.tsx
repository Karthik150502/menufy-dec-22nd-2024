import { Env } from '@/lib/config';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components';
import { Brand } from '../auth/brand';


interface EmailVerificationProps {
  name: string | null;
  verifyLink: string;
}

export function EmailVerification({
  name,
  verifyLink
}: EmailVerificationProps) {
  return (
    <Html>
      <Head>
        <title>Email Verification</title>
      </Head>
      <Preview>Verify your Menufy account email address</Preview>
      <Tailwind>
        <Body className='bg-white text-gray-900 font-sans'>
          <Container className='max-w-[480px] my-0 mx-auto pt-5 pb-12 px-0'>
            <Link href={Env.BASE_URL} className='flex items-center text-gray-800'>
              <Brand />
            </Link>

            <Text className='text-xl'>
              Hi <strong>{typeof name === 'string' ? name : 'User'}</strong>,
              there is an account registered with your email.
            </Text>

            <Section className='p-6 border-solid border border-gray-300 rounded-md text-center'>
              <Text className='m-0 mb-3 text-left'>
                Greeting from <strong>Menufy</strong>!
              </Text>
              <Text className='m-0 mb-3 text-left'>
                A Menufy account was registered with your email
                address. We want to make sure it&apos;s really you. Please click
                the button below to verify your email address.
              </Text>

              <Button
                href={verifyLink}
                className='text-sm font-semibold bg-gray-900 rounded-md text-white py-2 px-6'
              >
                Verify
              </Button>
            </Section>

            <Text className='text-gray-500 text-xs text-center mt-5'>
              <Brand />
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
