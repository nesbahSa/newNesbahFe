import { BentoCard } from '@/components/bento-card'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient } from '@/components/gradient'
import { Keyboard } from '@/components/keyboard'
import { Link } from '@/components/link'
import { LinkedAvatars } from '@/components/linked-avatars'
import { LogoCloud } from '@/components/logo-cloud'
import { LogoCluster } from '@/components/logo-cluster'
import { LogoTimeline } from '@/components/logo-timeline'
import { Map } from '@/components/map'
import { Navbar } from '@/components/navbar'
import { Screenshot } from '@/components/screenshot'
import { Testimonials } from '@/components/testimonials'
import { Heading, Subheading } from '@/components/text'
import { ChevronRightIcon } from '@heroicons/react/16/solid'

export const metadata = {
  description:
    'Radiant helps you sell more by revealing sensitive information about your customers.',
}

function Hero() {
  return (
    <div className="relative">
      <Gradient className="absolute inset-2 bottom-0 rounded-4xl ring-1 ring-inset ring-black/5" />
      <Container className="relative">
        <Navbar
          /*banner={
            <Link
              href="/blog/radiant-raises-100m-series-a-from-tailwind-ventures"
              className="flex items-center gap-1 rounded-full bg-fuchsia-950/35 px-3 py-0.5 text-sm/6 font-medium text-white data-[hover]:bg-fuchsia-950/30"
            >
              Nesbah jargon here
              <ChevronRightIcon className="size-4" />
            </Link>
          }*/
        />
          <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
              <h1 className="font-display text-balance text-xl/[0.9] font-normal tracking-tight text-white sm:text-4xl/[0.8] md:text-9xl/[0.8]">
                {/* Does your company need a business loan? */}
                عندك شركة ومحتاج تمويل؟
              </h1>
              <p className="mt-8 max-w-5xl text-xl/7 font-normal text-white sm:text-2xl/8">
                  {/* With Nesbah, we save your time and effort in finding the perfect financial solutions and quickly connect you with the best service providers for your company. */}
                  مع نسبة ، نوفر وقتك وجهدك في العثور على حلول مالية مثالية ، ونربطك بسرعة بأفضل مزودي الخدمات لشركتك.
              </p>

          <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
            <Button href="/register">
            {/* Get started */}
            ابدأ الآن
            </Button>

          </div>
        </div>
      </Container>
    </div>
  )
}



function BentoSection() {
    return (
        <Container className="mx-auto px-8 sm:px-12 lg:px-20">
            <Heading as="h3" className="mt-2 max-w-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {/* Why should you choose Nesbah? */}
                لماذا يجب عليك اختيار نسبة؟
            </Heading>
            <p className="mt-8 max-w-full text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
                {/* We leverage our extensive network in the financial industry to streamline your business needs and save you time. */}
                نستفيد من شبكتنا الواسعة في الصناعة المالية لتبسيط عملية التسجيل وطلب الخدمات المالية وتوفير الوقت. قم بالتسجيل لمعرفة المزيد حول كيف يمكننا مساعدتك في زيادة مزايا منشأتك وتعزيز التجربة المالية لموظفيك
            </p>
            <div className="mt-2 grid grid-cols-1 sm:mt-16 lg:grid-cols-1 lg:grid-rows-2 gap-y-4">

                <div className="relative h-auto w-full max-w-8xl rounded-2xl overflow-hidden sm:h-[500px] lg:h-[700px]">
                    <img src="/screenshots/nesbahComparison1.jpeg" alt="Comparison 1" className="w-full h-full object-cover rounded-xl" />
                </div>

                <div className="relative h-auto w-full max-w-8xl rounded-2xl overflow-hidden sm:h-[500px] lg:h-[700px]">
                    <img src="/screenshots/nesbahComparison2.jpeg" alt="Comparison 2" className="w-full h-full object-cover rounded-xl" />
                </div>

            </div>
        </Container>
    );
}


/*
function DarkBentoSection() {
  return (
    <div className="mx-2 mt-1 mb-10 rounded-4xl bg-gray-900 py-32">
      <Container>
        <Subheading dark>Outreach</Subheading>
        <Heading as="h1" dark className="mt-8 max-w-full text-xl">
            All you have to do is complete the application and we will submit your request to all our partner service providers
        </Heading>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <BentoCard
            dark
            eyebrow="Networking"
            title="Sell at the speed of light"
            description="Our RadiantAI chat assistants analyze the sentiment of your conversations in real time, ensuring you're always one step ahead."
            graphic={
              <div className="h-80 bg-[url(/screenshots/networking.png)] bg-[size:851px_344px] bg-no-repeat" />
            }
            fade={['top']}
            className="max-lg:rounded-t-4xl lg:col-span-4 lg:rounded-tl-4xl"
          />
          <BentoCard
            dark
            eyebrow="Integrations"
            title="Meet leads where they are"
            description="With thousands of integrations, no one will be able to escape your cold outreach."
            graphic={<LogoTimeline />}
            className="z-10 !overflow-visible lg:col-span-2 lg:rounded-tr-4xl"
          />
          <BentoCard
            dark
            eyebrow="Meetings"
            title="Smart call scheduling"
            description="Automatically insert intro calls into your leads' calendars without their consent."
            graphic={<LinkedAvatars />}
            className="lg:col-span-2 lg:rounded-bl-4xl"
          />
          <BentoCard
            dark
            eyebrow="Engagement"
            title="Become a thought leader"
            description="RadiantAI automatically writes LinkedIn posts that relate current events to B2B sales, helping you build a reputation as a thought leader."
            graphic={
              <div className="h-80 bg-[url(/screenshots/engagement.png)] bg-[size:851px_344px] bg-no-repeat" />
            }
            fade={['top']}
            className="max-lg:rounded-b-4xl lg:col-span-4 lg:rounded-br-4xl"
          />
        </div>
      </Container>
    </div>
  )

}
*/

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <main>
        <Container className="mt-10">
          <LogoCloud />
        </Container>
        <div className="bg-gradient-to-b from-white from-50% to-gray-100 py-32">
          <BentoSection />
        </div>
        {/*<DarkBentoSection />*/}

      </main>

      <Footer />
    </div>
  )
}
