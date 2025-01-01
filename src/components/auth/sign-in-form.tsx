'use client';

import * as z from 'zod';
import Link from 'next/link';
import { Loader2, Eye, EyeOff, LucideIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRef, useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { SignInSchema } from '@/schema';
import { signIn } from '@/actions/sign-in';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { CardWrapper } from '@/components/auth/card-wrapper';

export function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider.'
      : '';

  const [isPending, startTransition] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [pwdShow, setPwdShow] = useState<boolean>(false);
  const pwdEyeIcon = useRef<LucideIcon>(EyeOff);

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (values: z.infer<typeof SignInSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      signIn(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
          window.localStorage.delete("menufy/active-rest")
        })
        .catch(() => setError('Oops! Something went wrong.'));
    });
  };

  return (
    <CardWrapper
      headerLabel='Sign in to your account'
      footerLabel='Sign up'
      footerHref='/auth/sign-up'
      footerDesc="Dont't have an account yet?"
      showSocial={!showTwoFactor}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            {/* Display form for 2FA */}
            {showTwoFactor && (
              <FormField
                control={form.control}
                name='code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Two Factor Authentication Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='123456'
                      />

                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Display form for no 2FA */}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder='name@domain.com'
                          type='email'
                          autoComplete='email'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className='w-full bg-red h-full relative'>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder='••••••••'
                            type={pwdShow ? "text" : "password"}
                          />
                          <Button type="button" variant={"outline"} size={"icon"}
                            onClick={() => {
                              setPwdShow(!pwdShow)
                              pwdEyeIcon.current = pwdShow ? EyeOff : Eye
                            }}
                            className='absolute right-0 top-0 rounded-tl-none rounded-bl-none group'
                          >
                            <pwdEyeIcon.current className='stroke-muted-foreground transition-colors duration-300 group-hover:stroke-primary_2' />
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                      <Button
                        disabled={isPending}
                        size='sm'
                        variant='link'
                        asChild
                        className='px-0 font-normal'
                      >
                        <Link href='/auth/forgot-password' className='text-primary_2'>
                          Forgot password?
                        </Link>
                      </Button>
                    </FormItem>
                  )}

                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className='w-full'>
            {isPending && (
              <>
                <Loader2 className='animate-spin mr-2' size={18} />
                {showTwoFactor ? 'Confirming...' : 'Signing in...'}
              </>
            )}
            {!isPending && <>{showTwoFactor ? 'Confirm' : 'Sign in'}</>}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
