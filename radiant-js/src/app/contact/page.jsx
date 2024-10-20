'use client';
import { useId } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { SocialMedia } from '@/components/SocialMedia'
import { Footer } from '@/components/footer'
import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import { Gradient, GradientBackground } from '@/components/gradient'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { CheckIcon, XCircleIcon } from '@heroicons/react/24/outline'

function FormSentModal({ isOpen, onClose, isSuccess }) {
    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                        <div>
                            <div
                                className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
                                    isSuccess ? 'bg-green-100' : 'bg-red-100'
                                }`}
                            >
                                {isSuccess ? (
                                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                ) : (
                                    <XCircleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                )}
                            </div>
                            <div className="mt-3 text-center sm:mt-5">
                                <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                    {isSuccess ? 'Your request has been sent' : 'Submission Failed'}
                                </DialogTitle>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        {isSuccess
                                            ? 'We will get back to you as soon as possible. Thank you for your interest.'
                                            : 'There was an error processing your request. Please try again later.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                OK
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}

function TextInput({ label, ...props }) {
    let id = useId()

    return (
        <div className="group relative z-0 transition-all focus-within:z-10">
            <input
                type="text"
                id={id}
                {...props}
                placeholder=" "
                className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
            />
            <label
                htmlFor={id}
                className="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
            >
                {label}
            </label>
        </div>
    );
}

function TextArea({ label, ...props }) {
    let id = useId()

    return (
        <div className="group relative z-0 transition-all focus-within:z-10">
      <textarea
          id={id}
          {...props}
          placeholder=" "
          rows="5"
          className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
      />
            <label
                htmlFor={id}
                className="pointer-events-none absolute left-6 top-3 text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-placeholder-shown:top-12 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
            >
                {label}
            </label>
        </div>
    );
}

function ContactForm() {
    const form = useRef();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);

    const validateForm = () => {
        const formData = new FormData(form.current);
        const name = formData.get('name');
        const email = formData.get('email');
        const company = formData.get('company');
        const phone = formData.get('phone');

        if (!name || !email || !company || !phone) {
            setIsSuccess(false); // Failure state
            setIsModalOpen(true); // Show failure modal
            return false;
        }
        return true;
    };

    const sendEmail = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        emailjs.sendForm('service_a20mtko', 'template_ii88j44', form.current, 'gb46bKjwD1H8tuLGR')
            .then((result) => {
                console.log('Email sent successfully:', result.text);
                setIsSuccess(true);
                setIsModalOpen(true);
            }, (error) => {
                console.log('Error sending email:', error.text);
                setIsSuccess(false);
                setIsModalOpen(true);
            });

        e.target.reset();
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <FadeIn className="lg:order-last">
            <form ref={form} onSubmit={sendEmail}>
                <h2 className="font-display text-base font-semibold text-neutral-950">
                    {/* Your queries */}
                    استفساراتك
                </h2>
                <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
                    <TextInput label="الاسم" name="name" autoComplete="name" required />
                    <TextInput
                        label="البريد الإلكتروني"
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                    />
                    <TextInput
                        label="اسم الشركة"
                        name="company"
                        autoComplete="organization"
                        required
                    />
                    <TextInput label="الهاتف" type="tel" name="phone" autoComplete="tel" required />
                    <TextArea label="الرسالة" name="message" />
                </div>
                <Button
                    type="submit"
                    className="mt-10 mb-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full px-6 py-3 transition ease-in-out duration-200 hover:bg-opacity-50 hover:shadow-lg hover:shadow-pink-500/50"
                >
                    {/* Let’s work together */}
                    للتعاون معنا
                </Button>
            </form>

            {isModalOpen && <FormSentModal isOpen={isModalOpen} onClose={closeModal} isSuccess={isSuccess} />}
        </FadeIn>
    );
}

function ContactDetails() {
    return (
        <FadeIn>

            <h2 className="font-display text-base font-bold text-neutral-950">
                {/* Who can partner? */}
                من يمكنه الشراكة؟
            </h2>
            <p className="mt-6 text-base  text-neutral-1200">
                {/* We invite financial institutions, banks, and financial companies to partner with us. Together, we can expand your reach, innovate your services, and drive mutual growth. */}
                ندعو المؤسسات المالية والبنوك والشركات المالية للشراكة معنا. معًا، يمكننا توسيع نطاقكم وابتكار خدماتكم وتحقيق النمو المتبادل.
            </p>

            <Border className="mt-16 pt-16">
                <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
                    {[
                        // ['Email', 'admin@nesbah.com.sa'],
                        // ['Address', 'Riyadh, Saudi Arabia'],
                        ['البريد الإلكتروني', 'admin@nesbah.com.sa'],
                        ['العنوان', 'الرياض, السعودية'],
                    ].map(([label, email]) => (
                        <div key={email}>
                            <dt className="font-semibold text-neutral-950">{label}</dt>
                            <dd>
                                <Link
                                    href={`mailto:${email}`}
                                    className="text-neutral-600 hover:text-neutral-950"
                                >
                                    {email}
                                </Link>
                            </dd>
                        </div>
                    ))}
                </dl>
            </Border>
            <Border className="mt-16 pt-16">
                {/*<h2 className="font-display text-base font-semibold text-neutral-950">
          Follow us
        </h2>
          <SocialMedia className="mt-6 mb-8 sm:mb-0" />*/}
            </Border>
        </FadeIn>
    );
}

export default function Contact() {
    return (
        <>
            <main className="overflow-hidden">
                <GradientBackground className="opacity-90" />
                <Container>
                    <Navbar />
                </Container>
                {/* Contact us */}
                <PageIntro className= "py-0.10" eyebrow="تواصل معنا" title={<span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {/* Partner with Nesbah */}
                    شركاء نسبة
                    </span>}>
                    <p>
                        {/* Our mission is to bridge the gap between financial service providers and the market's evolving needs. Join us as we collaborate to shape the future of banking and finance. */}
                        مهمتنا هي سد الفجوة بين مقدمي الخدمات المالية واحتياجات السوق المتطورة. انضم إلينا ونحن نتعاون لتشكيل مستقبل الخدمات المصرفية والتمويل
                        </p>
                </PageIntro>

                <Container className="mt-12 sm:mt-20 lg:mt-28">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
                        <ContactForm />
                        <ContactDetails />
                    </div>
                </Container>

                <Footer />
            </main>
        </>
    );
}
