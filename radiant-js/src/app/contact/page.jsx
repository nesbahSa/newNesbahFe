
"use client";
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
import FormSentModal from '@/components/FormSentModal';
import { Gradient, GradientBackground } from '@/components/gradient'


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
    )
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
    )
}


function ContactForm() {
    const form = useRef();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true); // State to track success or failure

    // Form validation to ensure mandatory fields are filled
    const validateForm = () => {
        const formData = new FormData(form.current);
        const name = formData.get('name');
        const email = formData.get('email');
        const company = formData.get('company');
        const phone = formData.get('phone');

        // Check if any required field is missing
        if (!name || !email || !company || !phone) {
            setIsSuccess(false); // Failure state
            setIsModalOpen(true); // Show failure modal
            return false;
        }
        return true;
    };

    const sendEmail = (e) => {
        e.preventDefault();

        // Validate the form before sending
        if (!validateForm()) {
            return; // Stop if validation fails
        }

        // If validation passes, proceed with sending the email
        emailjs.sendForm('service_a20mtko', 'template_ii88j44', form.current, 'gb46bKjwD1H8tuLGR')
            .then((result) => {
                console.log('Email sent successfully:', result.text);
                setIsSuccess(true); // Set success state
                setIsModalOpen(true); // Show the modal on success
            }, (error) => {
                console.log('Error sending email:', error.text);
                setIsSuccess(false); // Set failure state
                setIsModalOpen(true); // Show the modal on failure
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
                    Your queries
                </h2>
                <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
                    <TextInput label="Name" name="name" autoComplete="name" required />
                    <TextInput
                        label="Email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        required
                    />
                    <TextInput
                        label="Company"
                        name="company"
                        autoComplete="organization"
                        required
                    />
                    <TextInput label="Phone" type="tel" name="phone" autoComplete="tel" required />
                    <TextArea label="Message" name="message" />
                </div>
                <Button
                    type="submit"
                    className="mt-10 mb-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-full px-6 py-3 transition ease-in-out duration-200 hover:bg-opacity-50 hover:shadow-lg hover:shadow-pink-500/50"
                >
                    Let’s work together
                </Button>
            </form>

            {/* Modal for form submission success or failure */}
            {isModalOpen && <FormSentModal onClose={closeModal} isSuccess={isSuccess} />}
        </FadeIn>
    );
}

function ContactDetails() {
  return (
    <FadeIn>

      <h2 className="font-display text-base font-bold text-neutral-950">
          Who can partner?
      </h2>
      <p className="mt-6 text-base  text-neutral-1200">
          We invite financial institutions, banks, and financial companies to partner with us. Together, we can expand your reach, innovate your services, and drive mutual growth.
      </p>

      {/*<Offices className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2" />*/}

      <Border className="mt-16 pt-16">

        <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
          {[
            ['Email', 'admin@nesbah.com.sa'],
            ['Address', 'Riyadh, Saudi Arabia'],
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
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Follow us
        </h2>
        <SocialMedia className="mt-6" />
      </Border>
    </FadeIn>
  )
}


export default function Contact() {
  return (
    <>

        <main className="overflow-hidden">
            <GradientBackground className="opacity-70" />
            <Container>
                <Navbar />
            </Container>

            <PageIntro  eyebrow="Contact us" title={<span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Partner with Nesbah</span>}>
                <p>Our mission is to bridge the gap between financial service providers and the market's evolving needs. Join us as we collaborate to shape the future of banking and finance.</p>
            </PageIntro>


            <Container className="mt-24 sm:mt-32 lg:mt-40">

                <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
                    <ContactForm />
                    <ContactDetails />
                </div>
            </Container>

            <Footer />
        </main>

    </>
  )
}
