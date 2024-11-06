"use client";

import { useState } from 'react';
import { Button } from '@/components/button';
import { GradientBackground } from '@/components/gradient';
import { Link } from '@/components/link';
import LoginStatusModal from '@/components/LoginStatusModal';
import { Checkbox, Field, Input, Label } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/16/solid';
import { clsx } from 'clsx';
import { Mark } from '@/components/logo'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await fetch('https://portal.nesbah.com.sa/account/login/', {
        method: 'POST',
        credentials: "include",
        body: formData,

      });

      const data = await response.json();
      console.log('Response status:', response.status);
      console.log('Response data:', data);

      if (response.ok) {
        window.location.href = data.redirect;
      } else {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setIsModalOpen(true);
    }
  };

  return (
      <main className="overflow-hidden bg-gray-50">
        <GradientBackground />
        <div className="isolate flex min-h-dvh items-center justify-center p-6 lg:p-8">
          <div className="w-full max-w-md rounded-xl bg-white shadow-md ring-1 ring-black/5">
            <form onSubmit={handleLogin} className="p-7 sm:p-11">
              <div className="flex items-start">
                <Link href="/" title="Home">
                  <Mark className="h-9 fill-black" />
                </Link>
              </div>
              <h1 className="mt-8 text-base/6 font-medium">مرحبا بك</h1>
              <p className="mt-1 text-sm/5 text-gray-600">تسجيل الدخول للحساب للمتابعة</p>
              <Field className="mt-8 space-y-3">
                <Label className="text-sm/5 font-medium">البريد الإلكتروني</Label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="البريد الإلكتروني"
                    className="block w-full rounded-lg border shadow ring-1 ring-black/10 px-4 py-2"
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
                      className="block w-full rounded-lg border shadow ring-1 ring-black/10 pr-12 px-4 py-2"
                  />
                  <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? 'اخفاء' : 'اظهار'}
                  </button>
                </div>
              </Field>

              <div className="mt-8 flex items-center justify-between text-sm/5">
                <Field className="flex items-center gap-3">
                  <Checkbox
                      name="remember-me"
                      className={clsx(
                          'group block size-4 rounded border shadow ring-1 ring-black/10 focus:outline-none',
                          'data-[checked]:bg-black data-[checked]:ring-black',
                          'data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-black'
                      )}
                  >
                    <CheckIcon className="fill-white opacity-0 group-data-[checked]:opacity-100" />
                  </Checkbox>
                  <Label>تذكرني</Label>
                </Field>
                <Link href="#" className="font-medium hover:text-gray-600">
                  هل نسيت كلمة المرور؟
                </Link>
              </div>
              <div className="mt-8">
                <button
                    type="submit"
                    className="w-full mt-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full px-6 py-3 transition ease-in-out duration-200 hover:bg-opacity-50 hover:shadow-lg hover:shadow-pink-500/50"
                >
                  تسجيل الدخول
                </button>
              </div>
            </form>
            <div className="m-1.5 rounded-lg bg-gray-50 py-4 text-center text-sm/5 ring-1 ring-black/5">
              ليس لديك حساب ؟{' '}
              <Link href="/register" className="font-medium hover:text-gray-600">
                إنشاء حساب
              </Link>
            </div>
          </div>
        </div>
        {/* Render the modal and control its open state */}
        {isModalOpen && <LoginStatusModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      </main>
  );
}
