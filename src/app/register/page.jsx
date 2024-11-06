"use client";

import { Button } from '@/components/button';
import { GradientBackground } from '@/components/gradient';
import { Link } from '@/components/link';
import { Checkbox, Field, Input, Label } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/16/solid';
import { clsx } from 'clsx';
import { useState } from 'react';
import RegistrationModal from '@/components/RegistrationModal';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("Form submitted");


        const formData = new FormData();
        formData.append('username', username);
        formData.append('first_name', firstName);
        formData.append('email', email);
        formData.append('password1', password);
        formData.append('password2', confirmPassword);

        try {
            const response = await fetch('https://portal.nesbah.com.sa/account/register/', {
                method: 'POST',
                body: formData,
            });

            console.log('Response Status:', response.status);
            console.log('Response Headers:', [...response.headers.entries()]);

            const data = await response.json();
            if (response.ok) {
                setIsSuccess(true);
            } else {
                setIsSuccess(false);
            }
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error during registration:', error);
            setIsSuccess(false);
            setIsModalOpen(true);
        }
    };

    return (
        <main className="overflow-hidden bg-gray-50">
            <GradientBackground />
            <div className="isolate flex min-h-dvh items-center justify-center p-6 lg:p-8">
                <div className="w-full max-w-md rounded-xl bg-white shadow-md ring-1 ring-black/5">
                    <form onSubmit={handleRegister} className="p-7 sm:p-11">
                        <Link href="/" className="font-medium hover:text-gray-600">
                            العودة إلى الصفحة الرئيسية
                        </Link>
                        <h1 className="mt-8 text-base/6 font-medium">مرحبًا بك في نسبة</h1>
                        <p className="mt-1 text-sm/5 text-gray-600">وسع أعمالك معنا بدءًا من اليوم</p>

                        <Field className="mt-8 space-y-3">
                            <Label className="text-sm/5 font-medium">اسم الشركة</Label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                placeholder="اسم الشركة"
                                className="block w-full rounded-lg border shadow px-4 py-2"
                            />
                        </Field>

                        <Field className="mt-8 space-y-3">
                            <Label className="text-sm/5 font-medium">اسم المستخدم</Label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                placeholder="اسم المستخدم"
                                className="block w-full rounded-lg border shadow px-4 py-2"
                            />
                        </Field>

                        <Field className="mt-8 space-y-3">
                            <Label className="text-sm/5 font-medium">البريد الإلكتروني</Label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="البريد الإلكتروني"
                                className="block w-full rounded-lg border shadow px-4 py-2"
                            />
                        </Field>

                        <Field className="mt-8 space-y-3 relative">
                            <Label className="text-sm/5 font-medium">كلمة المرور</Label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="كلمة المرور"
                                    className="block w-full rounded-lg border shadow px-4 py-2 pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? 'إخفاء' : 'إظهار'}
                                </button>
                            </div>
                        </Field>

                        <Field className="mt-8 space-y-3 relative">
                            <Label className="text-sm/5 font-medium">تأكيد كلمة المرور</Label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder="تأكيد كلمة المرور"
                                    className="block w-full rounded-lg border shadow px-4 py-2 pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? 'إخفاء' : 'إظهار'}
                                </button>
                            </div>
                        </Field>

                        <div className="mt-8 flex items-center justify-between text-sm/5">
                            <Field className="flex items-center gap-3">
                                <Checkbox
                                    name="terms"
                                    className={clsx(
                                        'group block size-4 rounded border border-transparent shadow ring-1 ring-black/10 focus:outline-none',
                                        'data-[checked]:bg-black data-[checked]:ring-black',
                                        'data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-black'
                                    )}
                                >
                                    <CheckIcon className="fill-white opacity-0 group-data-[checked]:opacity-100" />
                                </Checkbox>
                                <Label>أوافق على شروط وأحكام الخدمة وسياسة الخصوصية لنسبة</Label>
                            </Field>
                        </div>

                        <div className="mt-8">
                            <button
                                type="submit"
                                className="w-full mt-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full px-6 py-3 transition ease-in-out duration-200 hover:bg-opacity-50 hover:shadow-lg"
                            >
                                تسجيل
                            </button>
                        </div>
                    </form>

                    <div className="m-1.5 rounded-lg bg-gray-50 py-4 text-center text-sm/5 ring-1 ring-black/5">
                        هل لديك حساب بالفعل؟{' '}
                        <Link href="/login" className="font-medium hover:text-gray-600">
                            تسجيل الدخول
                        </Link>
                    </div>
                </div>
            </div>

            {/* Render the RegistrationModal component */}
            <RegistrationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                isSuccess={isSuccess}
            />
        </main>
    );
}
