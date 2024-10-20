import { AnimatedNumber } from '@/components/animated-number'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'

export const metadata = {
  title: 'consultancy',
  description:
      'We’re on a mission to transform revenue organizations by harnessing vast amounts of illegally acquired customer data.',
}

function Header() {
  return (
      <Container className="mt-16">
        <Heading as="h1">Retail Banking Consultancy Services.</Heading>
        <Lead className="mt-6 max-w-3xl">
          We offer a range of consultancy services aimed at enhancing and developing processes and products in retail banking
        </Lead>
        <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
          {/* Your existing content */}
        </section>
      </Container>
  )
}

// New Example component added after Header
function Example() {
  const features = [
    { name: 'Retail Banking Strategy Development', description: 'Tailored strategies designed for the Saudi Arabian banking environment.' },
    { name: 'Risk Management Solutions', description: 'Risk strategies developed with an in-depth understanding of Saudi regulatory frameworks.' },
    { name: 'Process Digitization', description: 'Digital transformation solutions attuned to the needs of Saudi Arabian banks.' },
    { name: 'Financial Technology Integration', description: 'Integrating advanced fintech solutions, aligned with Saudi Arabia’s digital banking trends.' },
    { name: 'Open Banking Consultation and Implementation', description: 'Leading open banking initiatives in the context of Saudi Arabia\'s financial landscape.' },
    { name: 'Product Program Development', description: 'Banking programs developed with an understanding of Saudi Arabia’s financial needs.' },
    { name: 'Product Gap Analysis', description: 'Identifying and addressing product needs in the Saudi banking market.' },
    { name: 'Risk Acceptance Criteria Benchmarking', description: 'Benchmarking against global standards with a focus on Saudi Arabia’s banking sector.' },
    { name: 'Customer Experience & Efficiency Enhancement', description: 'Custom solutions to meet the specific needs of Saudi banking customers.' },
    { name: 'Product Development', description: 'Innovating banking products to cater to the distinct market dynamics of Saudi Arabia.' },
    { name: 'Market Research and Analysis', description: 'Insights and analysis specific to the Saudi banking sector.' },
    { name: 'Training and Development Programs', description: 'Cultivating banking talent with a focus on Saudi Arabia’s market requirements.' },
    { name: 'Collection Policy and Procedures', description: 'Strategies crafted for effective debt recovery within the Saudi banking system.' },
    { name: 'Process Reengineering', description: 'Optimizing operations for the unique challenges of Saudi Arabian banks.' },
    { name: 'Delegation of Authority Frameworks', description: 'Decision-making structures tailored for the Saudi banking environment. Decision-making structures tailored for the Saudi banking environment.' },
  ]

  return (
      <div className="bg-white">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our services</h2>

            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {features.map((feature) => (
                  <div key={feature.name} className="border-t border-gray-200 pt-4">
                    <dt className="font-medium text-gray-900">{feature.name}</dt>
                    <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
                  </div>
              ))}
            </dl>
          </div>
          <div className="grid grid-cols-2 grid-rows-4 gap-4 sm:gap-6 lg:gap-8">
            <img
                alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
                src="https://tailwindui.com/plus/img/ecommerce-images/product-feature-03-detail-01.jpg"
                className="rounded-lg bg-gray-100"
            />
            <img
                alt="Top down view of walnut card tray with embedded magnets and card groove."
                src="https://tailwindui.com/plus/img/ecommerce-images/product-feature-03-detail-02.jpg"
                className="rounded-lg bg-gray-100"
            />
            <img
                alt="Side of walnut card tray with card groove and recessed card area."
                src="https://tailwindui.com/plus/img/ecommerce-images/product-feature-03-detail-03.jpg"
                className="rounded-lg bg-gray-100"
            />
            <img
                alt="Walnut card tray filled with cards and card angled in dedicated groove."
                src="https://tailwindui.com/plus/img/ecommerce-images/product-feature-03-detail-04.jpg"
                className="rounded-lg bg-gray-100"
            />
              <img
                  alt="Walnut card tray filled with cards and card angled in dedicated groove."
                  src="https://tailwindui.com/plus/img/ecommerce-images/product-feature-03-detail-04.jpg"
                  className="rounded-lg bg-gray-100"
              />
              <img
                  alt="Walnut card tray filled with cards and card angled in dedicated groove."
                  src="https://tailwindui.com/plus/img/ecommerce-images/product-feature-03-detail-04.jpg"
                  className="rounded-lg bg-gray-100"
              />
          </div>
        </div>
      </div>
  )
}

function Person({ name, description, img }) {
  return (
    <li className="flex items-center gap-4">
      <img alt="" src={img} className="size-12 rounded-full" />
      <div className="text-sm/6">
        <h3 className="font-medium text-2xl">{name}</h3>
        <p className="text-gray-500 text-xl">{description}</p>
      </div>
    </li>
  )
}


function Team() {
  return (
    <Container className="mt-15">

      <Heading as="h3" className="mt-2">
            Why Nesbah?
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        Radiant is founded by two of the best sellers in the business and backed
        by investors who look the other way.
      </Lead>


      <hr className="mt-6 border-t border-gray-200" />
      <ul
        role="list"
        className="mx-auto mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        <Person
          name="Saudi Market Expertise:"
          description="Unmatched local knowledge and expertise in Saudi Arabia's retail banking sector."
          img="/team/NumberOne.jpg"
        />
        <Person
          name="Customized Solutions:"
          description="Services uniquely designed for the Saudi banking landscape."
          img="/team/NumberTwo.jpg"
        />
        <Person
          name="Dedicated Partnerships:"
          description="Committed to fostering strong relationships within the Saudi financial community."
          img="/team/NumberThree.jpg"
        />

      </ul>
    </Container>
  )
}

function Investors() {
  return (
    <Container className="mt-32">
      <Subheading>Investors</Subheading>
      <Heading as="h3" className="mt-2">
        Funded by industry-leaders.
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        We are fortunate to be backed by the best investors in the industry —
        both literal and metaphorical partners in crime.
      </Lead>
      <Subheading as="h3" className="mt-24">
        Venture Capital
      </Subheading>
      <hr className="mt-6 border-t border-gray-200" />
      <ul
        role="list"
        className="mx-auto mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2"
      >
        <li>
          <img
            alt="Remington Schwartz"
            src="/investors/remington-schwartz.svg"
            className="h-14"
          />
          <p className="mt-6 max-w-lg text-sm/6 text-gray-500">
            Remington Schwartz has been a driving force in the tech industry,
            backing bold entrepreneurs who explore grey areas in financial and
            privacy law. Their deep industry expertise and extensive political
            lobbying provide their portfolio companies with favorable regulation
            and direct access to lawmakers.
          </p>
        </li>
        <li>
          <img alt="Deccel" src="/investors/deccel.svg" className="h-14" />
          <p className="mt-6 max-w-lg text-sm/6 text-gray-500">
            Deccel has been at the forefront of innovation, investing in
            pioneering companies across various sectors, including technology,
            consumer goods, and healthcare. Their philosophy of ‘plausible
            deniability’ and dedication to looking the other way have helped
            produce some of the world’s most controversial companies.
          </p>
        </li>
      </ul>
      <Subheading as="h3" className="mt-24">
        Individual investors
      </Subheading>
      <hr className="mt-6 border-t border-gray-200" />
      <ul
        role="list"
        className="mx-auto mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        <Person
          name="Kristin Watson"
          description="TechNexus Ventures"
          img="/individual-investors/kristin-watson.jpg"
        />
        <Person
          name="Emma Dorsey"
          description="Innovate Capital Partners"
          img="/individual-investors/emma-dorsey.jpg"
        />
        <Person
          name="Alicia Bell"
          description="FutureWave Investments"
          img="/individual-investors/alicia-bell.jpg"
        />
        <Person
          name="Jenny Wilson"
          description="SynergyTech Equity"
          img="/individual-investors/jenny-wilson.jpg"
        />
        <Person
          name="Anna Roberts"
          description="NextGen Horizons"
          img="/individual-investors/anna-roberts.jpg"
        />
        <Person
          name="Benjamin Russel"
          description="Pioneer Digital Ventures"
          img="/individual-investors/benjamin-russel.jpg"
        />
      </ul>
    </Container>
  )
}

function Testimonial() {
  return (
    <div className="relative flex aspect-square flex-col justify-end overflow-hidden rounded-3xl sm:aspect-[5/4] lg:aspect-[3/4]">
      <img
        alt=""
        src="/testimonials/veronica-winton.jpg"
        className="absolute inset-0 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black from-10% to-75% ring-1 ring-inset ring-gray-950/10 lg:from-25%"
      />
      <figure className="relative p-10">
        <blockquote>
          <p className="relative text-xl/7 text-white before:absolute before:-translate-x-full before:content-['“'] after:absolute after:content-['”']">
            We&apos;ve managed to put two of our main competitors out of
            business in 6 months.
          </p>
        </blockquote>
        <figcaption className="mt-6 border-t border-white/20 pt-6">
          <p className="text-sm/6 font-medium text-white">Veronica Winton</p>
          <p className="text-sm/6 font-medium">
            <span className="bg-gradient-to-r from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] bg-clip-text text-transparent">
              CSO, Planeteria
            </span>
          </p>
        </figcaption>
      </figure>
    </div>
  )
}

function Careers() {
  return (
    <Container className="my-32">
      <Subheading>Careers</Subheading>
      <Heading as="h3" className="mt-2">
        Join our fully remote team.
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        We work together from all over the world, mainly from locations without
        extradition agreements.
      </Lead>
      <div className="mt-24 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_24rem]">
        <div className="lg:max-w-2xl">
          <Subheading as="h3">Open positions</Subheading>
          <div>
            <table className="w-full text-left">
              <colgroup>
                <col className="w-2/3" />
                <col className="w-1/3" />
                <col className="w-0" />
              </colgroup>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Location</th>
                  <th scope="col">Read more</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="colgroup" colSpan={3} className="px-0 pb-0 pt-10">
                    <div className="-mx-4 rounded-lg bg-gray-50 px-4 py-3 text-sm/6 font-semibold">
                      Engineering
                    </div>
                  </th>
                </tr>
                <tr className="border-b border-dotted border-gray-200 text-sm/6 font-normal">
                  <td className="px-0 py-4">iOS Developer</td>
                  <td className="px-0 py-4 text-gray-600">Remote</td>
                  <td className="px-0 py-4 text-right">
                    <Button variant="outline" href="#">
                      View listing
                    </Button>
                  </td>
                </tr>
                <tr className="border-b border-dotted border-gray-200 text-sm/6 font-normal">
                  <td className="px-0 py-4">Backend Engineer</td>
                  <td className="px-0 py-4 text-gray-600">Remote</td>
                  <td className="px-0 py-4 text-right">
                    <Button variant="outline" href="#">
                      View listing
                    </Button>
                  </td>
                </tr>
                <tr className="text-sm/6 font-normal">
                  <td className="px-0 py-4">Product Engineer</td>
                  <td className="px-0 py-4 text-gray-600">Remote</td>
                  <td className="px-0 py-4 text-right">
                    <Button variant="outline" href="#">
                      View listing
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="colgroup" colSpan={3} className="px-0 pb-0 pt-5">
                    <div className="-mx-4 rounded-lg bg-gray-50 px-4 py-3 text-sm/6 font-semibold">
                      Design
                    </div>
                  </th>
                </tr>
                <tr className="border-b border-dotted border-gray-200 text-sm/6 font-normal">
                  <td className="px-0 py-4">Principal Designer</td>
                  <td className="px-0 py-4 text-gray-600">Remote</td>
                  <td className="px-0 py-4 text-right">
                    <Button variant="outline" href="#">
                      View listing
                    </Button>
                  </td>
                </tr>
                <tr className="border-b border-dotted border-gray-200 text-sm/6 font-normal">
                  <td className="px-0 py-4">Designer</td>
                  <td className="px-0 py-4 text-gray-600">Remote</td>
                  <td className="px-0 py-4 text-right">
                    <Button variant="outline" href="#">
                      View listing
                    </Button>
                  </td>
                </tr>
                <tr className="text-sm/6 font-normal">
                  <td className="px-0 py-4">Senior Designer</td>
                  <td className="px-0 py-4 text-gray-600">Remote</td>
                  <td className="px-0 py-4 text-right">
                    <Button variant="outline" href="#">
                      View listing
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Testimonial />
      </div>
    </Container>
  )
}

export default function Company() {
  return (
      <main className="overflow-hidden">
        <GradientBackground />
        <Container>
          <Navbar />
        </Container>
        <Header />
        <Example /> {/* New section inserted here */}
        <Team />
        <Investors />
        <Careers />
        <Footer />
      </main>
  )
}