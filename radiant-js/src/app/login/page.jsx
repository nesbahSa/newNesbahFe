"use client";

import { useState } from 'react';

import { Button } from '@/components/button'
import { GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import { Mark } from '@/components/logo'
import { Checkbox, Field, Input, Label } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/16/solid'
import { clsx } from 'clsx'


export default function Login() {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="overflow-hidden bg-gray-50">
      <GradientBackground />
      <div className="isolate flex min-h-dvh items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md rounded-xl bg-white shadow-md ring-1 ring-black/5">
          <form action="#" method="POST" className="p-7 sm:p-11">
            <div className="flex items-start">
              <Link href="/" title="Home">
                <Mark className="h-9 fill-black" />
              </Link>
            </div>
            <h1 className="mt-8 text-base/6 font-medium">
            {/* Welcome back! */}
            مرحبا بك
            </h1>
            <p className="mt-1 text-sm/5 text-gray-600">
              {/* Sign in to your account to continue. */}
              تسجيل الدخول للحساب للمتابعة 
              </p>
            <Field className="mt-8 space-y-3">
              <Label className="text-sm/5 font-medium">
              {/* Email */}
              البريد الإلكتروني
              </Label>
              <Input
                required
                autoFocus
                type="email"
                name="email"
                className={clsx(
                  'block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10',
                  'px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6',
                  'data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black',
                )}
              />
            </Field>
            <Field className="mt-8 space-y-3 relative">
              <Label className="text-sm/5 font-medium">
              {/* Password */}
              كلمة المرور
              </Label>
              <div className="relative">
                <Input
                    required
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className={clsx(
                        'block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10 pr-12', // Add padding-right for the button
                        'px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6',
                        'data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black',
                    )}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {/* {showPassword ? 'Hide' : 'Show'} */}
                  {showPassword ? 'اخفاء' : 'اظهار'}
                </button>
              </div>
            </Field>

            <div className="mt-8 flex items-center justify-between text-sm/5">
              <Field className="flex items-center gap-3">
                <Checkbox
                  name="remember-me"
                  className={clsx(
                    'group block size-4 rounded border border-transparent shadow ring-1 ring-black/10 focus:outline-none',
                    'data-[checked]:bg-black data-[checked]:ring-black',
                    'data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-black',
                  )}
                >
                  <CheckIcon className="fill-white opacity-0 group-data-[checked]:opacity-100" />
                </Checkbox>
                <Label>
                  {/* Remember me */}
                  تذكرني
                  </Label>
              </Field>
              <Link href="#" className="font-medium hover:text-gray-600">
                {/* Forgot password? */}
                هل نسيت كلمة المرور؟
              </Link>
            </div>
            <div className="mt-8">
              <Button type="submit" className="w-full mt-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full px-6 py-3 transition ease-in-out duration-200 hover:bg-opacity-50 hover:shadow-lg hover:shadow-pink-500/50">
              {/* Sign in */}
              تسجيل الدخول
              </Button>
            </div>
          </form>
          <div className="m-1.5 rounded-lg bg-gray-50 py-4 text-center text-sm/5 ring-1 ring-black/5">
            {/* Not a member? */}
            ليس لديك حساب ؟
            {' '}
            <Link href="/register" className="font-medium hover:text-gray-600">
              {/* Create an account */}
              إنشاء حساب
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
