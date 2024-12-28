"use client";

import { Button } from '@/components/button';
import { GradientBackground } from '@/components/gradient';
import { Link } from '@/components/link';
import { Checkbox, Field, Input, Label } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/16/solid';
import { clsx } from 'clsx';
import { useState } from 'react';
import RegistrationModal from '@/components/RegistrationModal';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function Register() {

    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [modalMessage, setModalMessage] = useState("");


    const errorTranslations = {
        "A user with that username already exists.": "يوجد حساب بالفعل بهذه البيانات.يرجى تسجيل الدخول أو استخدام بيانات مختلفة لإنشاء حساب جديد.",
        "This password is too common.": "كلمة المرور الخاصة بك ضعيفة. يُوصى بأن تحتوي كلمة المرور على 8 أحرف على الأقل ورقم.",
    };




    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPasswordError('كلمة المرور غير متطابقة');
            return;
        } else {
            setPasswordError('');
        }

        console.log("Form submitted");

        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password1', password);
        formData.append('password2', confirmPassword);

        try {
            const response = await fetch('https://portal.nesbah.com.sa/account/register/', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setIsSuccess(true);
                setModalMessage('يرجى تفعيل حسابك من خلال النقر على الرابط المرسل إلى بريدك الإلكتروني.');
            } else {
                setIsSuccess(false);
                const errorKey = Object.keys(data.errors)[0]; // Get the first error field
                const errorMessage = data.errors[errorKey][0]; // Get the first error message
                const translatedMessage = errorTranslations[errorMessage] || "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.";
                setModalMessage(translatedMessage);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setIsSuccess(false);
            setModalMessage('يرجى تفعيل حسابك من خلال النقر على الرابط المرسل إلى بريدك الإلكتروني.');
        } finally {
            setIsModalOpen(true);
        }

        /*try {
            const response = await fetch('https://portal.nesbah.com.sa/account/register/', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setIsSuccess(true);
                console.log("registration successful");
            }
            else {
                setIsSuccess(false);
                console.log("registration failed");
            }

        } catch (error) {
            console.error('Error during registration:', error);
            setIsSuccess(false);
        } finally {
            setIsModalOpen(true);
        }*/
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
                            <div className="relative">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        if (!inputValue.includes(' ')) {
                                            setUsername(inputValue.replace(/\s/g, '')); // Remove spaces
                                            setUsernameError(false); // Remove warning if no spaces are present
                                        } else {
                                            setUsernameError(true); // Show warning if spaces are present
                                        }
                                    }}
                                    required
                                    placeholder="اسم المستخدم"
                                    className={`block w-full rounded-lg border px-4 py-2 ${
                                        usernameError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'shadow'
                                    }`}
                                />
                                {usernameError && (
                                    <p className="absolute text-red-500 text-sm mt-1">اسم المستخدم يجب ان لا يحتوي على مسافات</p>
                                )}
                            </div>
                        </Field>



                        <Field className="mt-8 space-y-3">
                            <Label className="text-sm/5 font-medium">البريد الإلكتروني</Label>
                            <input
                                type="email"
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
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (e.target.value.length < 8) {
                                            setErrorMessage('يُوصى بأن تحتوي على كلمة مرور على 8 أحرف على الأقل ورقم.');
                                        } else {
                                            setErrorMessage('');
                                        }
                                    }}
                                    required
                                    placeholder="كلمة المرور"
                                    className={`block w-full rounded-lg border shadow ring-1 px-4 py-2 pr-12 ${
                                        errorMessage ? 'border-red-500 ring-red-500' : 'ring-black/10'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" aria-hidden="true" />
                                    )}
                                </button>
                            </div>
                            {errorMessage && (
                                <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
                            )}
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
                                    {showPassword ? (
                                        <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" aria-hidden="true" />
                                    )}
                                </button>
                            </div>
                            {passwordError && (
                                <p className="text-red-500 text-sm mt-2">{passwordError}</p>
                            )}
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

            <RegistrationModal
                isOpen={isOpen}
                onClose={() => setIsModalOpen(false)}
                isSuccess={isSuccess}
                modalMessage={modalMessage}
            />
        </main>
    );
}
