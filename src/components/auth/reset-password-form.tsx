'use client';

import * as z from 'zod';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ResetPasswordSchema } from '@/schema';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { resetPassword } from '@/actions/reset-password';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { EyeOff, Eye, LucideIcon } from 'lucide-react';

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const pwdRef = useRef<LucideIcon>(EyeOff);
  const pwdConfRef = useRef<LucideIcon>(EyeOff);
  const [showPwd, setShowPwd] = useState<boolean>(false)
  const [showConfPwd, setShowConfPwd] = useState<boolean>(false)

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: ''
    }
  });

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      resetPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel='Enter a new password'
      footerLabel='Sign in'
      footerHref='/auth/sign-in'
      footerDesc='Done? '
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
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
                        type={showPwd ? "text" : "password"}
                      />
                      <Button type="button" variant={"outline"} size={"icon"}
                        onClick={() => {
                          setShowPwd(!showPwd)
                          pwdRef.current = showPwd ? EyeOff : Eye
                        }}
                        className='absolute right-0 top-0 rounded-tl-none rounded-bl-none group'
                      >
                        <pwdRef.current className='stroke-muted-foreground transition-colors duration-300 group-hover:stroke-primary_2' />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirm'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className='w-full bg-red h-full relative'>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='••••••••'
                        type={showConfPwd ? "text" : "password"}
                      />
                      <Button type="button" variant={"outline"} size={"icon"}
                        onClick={() => {
                          setShowConfPwd(!showConfPwd)
                          pwdConfRef.current = showConfPwd ? EyeOff : Eye
                        }}
                        className='absolute right-0 top-0 rounded-tl-none rounded-bl-none group'
                      >
                        <pwdConfRef.current className='stroke-muted-foreground transition-colors duration-300 group-hover:stroke-primary_2' />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type='submit' className='w-full'>
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
