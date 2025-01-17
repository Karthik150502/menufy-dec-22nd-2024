'use client';

import * as z from 'zod';
import { EyeOff, Eye, Loader2, LucideIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useRef, useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { SignUpSchema } from '@/schema';
import { signUp } from '@/actions/sign-up';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { CardWrapper } from '@/components/auth/card-wrapper';

export function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const pwdRef = useRef<LucideIcon>(EyeOff);
  const pwdConfRef = useRef<LucideIcon>(EyeOff);
  const [showPwd, setShowPwd] = useState<boolean>(false)
  const [showConfPwd, setShowConfPwd] = useState<boolean>(false)

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
      name: ''
    }
  });

  const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      signUp(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <CardWrapper
      headerLabel='Create an account'
      footerLabel='Sign in'
      footerHref='/auth/sign-in'
      footerDesc='Already have an account?'
      showSocial
    >
      <FormSuccess message={success} />
      {!success && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='John Doe'
                        type='text'
                        autoComplete='name'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            <Button disabled={isPending} type='submit' className='w-full'>
              {isPending && (
                <>
                  <Loader2 className='animate-spin mr-2' size={18} />
                  Creating...
                </>
              )}
              {!isPending && <>Create an account</>}
            </Button>
          </form>
        </Form>
      )}
    </CardWrapper>
  );
}
