"use client";


import { Button } from '@/components/button'
import { GradientBackground } from '@/components/gradient'
import { Link } from '@/components/link'
import { Mark } from '@/components/logo'
import { Checkbox, Field, Input, Label } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/16/solid'
import { clsx } from 'clsx'
import {useState} from "react";



export default function Register() {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className="overflow-hidden bg-gray-50">
            <GradientBackground />
            <div className="isolate flex min-h-dvh items-center justify-center p-6 lg:p-8">
                <div className="w-full max-w-md rounded-xl bg-white shadow-md ring-1 ring-black/5">
                    <form action="#" method="POST" className="p-7 sm:p-11">
                        {/*<div className="flex items-start">

                        </div>*/}

                        <Link href="/" className="font-medium hover:text-gray-600">
                            {/* Back to home */}
                            العودة إلى الصفحة الرئيسية
                        </Link>
                        <h1 className="mt-8 text-base/6 font-medium">
                        {/* Welcome to Nesbah */}
                        مرحبًا بك في نسبة
                        </h1>
                        <p className="mt-1 text-sm/5 text-gray-600">
                            {/* Expand your business with us starting from today */}
                            وسع أعمالك معنا بدءًا من اليوم
                        </p>
                        <Field className="mt-8 space-y-3">
                            <Label className="text-sm/5 font-medium">
                            {/* Company name */}
                            اسم الشركة
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

                        <Field className="mt-8 space-y-3">
                            <Label className="text-sm/5 font-medium">
                            {/* Username */}
                            اسم المستخدم
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
                            <div className="relative"> {/* Make this container relative */}
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
                                    {showPassword ? 'إخفاء' : 'إظهار'}
                                </button>
                            </div>
                        </Field>


                        <Field className="mt-8 space-y-3 relative">
                            <Label className="text-sm/5 font-medium">
                            {/* Confirm password */}
                            تأكيد كلمة المرور
                            </Label>
                            <div className="relative"> {/* Make this container relative */}
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
                                    {showPassword ? 'إخفاء' : 'إظهار'}
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
                                    {/* I Agree to Nesbah's Term and Conditions of Service and Privacy Policy */}
                                    أوافق على شروط وأحكام الخدمة وسياسة الخصوصية لنسبة
                                </Label>
                            </Field>

                        </div>
                        <div className="mt-8">
                            <Button type="submit" className="w-full mt-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full px-6 py-3 transition ease-in-out duration-200 hover:bg-opacity-50 hover:shadow-lg hover:shadow-pink-500/50">
                            {/* Register */}
                            تسجيل
                            </Button>
                        </div>
                    </form>
                    <div className="m-1.5 rounded-lg bg-gray-50 py-4 text-center text-sm/5 ring-1 ring-black/5">
                        {/* Already have an account? */}
                        هل لديك حساب بالفعل؟
                        {' '}
                        <Link href="/login" className="font-medium hover:text-gray-600">
                            {/* Sign in */}
                            تسجيل الدخول
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
