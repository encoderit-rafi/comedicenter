import Image from "next/image";
import Link from "next/link";
import { ServiceCard } from "./components/service-card";

export const dynamic = "force-dynamic";
const services = [
  {
    title: "Preventive Care",
    description:
      "Receive discounted rates on routine cleanings, exams, and X-rays to keep your teeth and gums healthy.",
  },
  {
    title: "Restorative Treatments",
    description:
      "Save on fillings, crowns, bridges, and other necessary treatments to restore your smile.",
  },
  {
    title: "Cosmetic Dentistry",
    description:
      "Achieve the smile of your dreams with discounts on teeth whitening, veneers, and more.",
  },
  {
    title: "Orthodontics",
    description:
      "Access affordable options for braces or clear aligners to straighten your teeth.",
  },
  {
    title: "Emergency Care",
    description:
      "Benefit from reduced costs on urgent dental treatments when you need them most.",
  },
  {
    title: "Pediatric Dental",
    description:
      "Achieve the smile of your dreams with discounts on teeth whitening, veneers, and more.",
    isSpecial: true,
  },
];
const CosMediCenterPage = () => {
  return (
    <>
      <div className="main_content_area bg-[#F6F8FB]">
        <div className="container mx-auto px-4 font-sans">
          <div className="flex flex-wrap items-center py-[50px]">
            <div className="w-full min-[1024px]:w-7/12">
              <div className="min-[1024px]:pr-[50px]">
                <h2 className="mb-5 text-[30px] font-[700] text-[#2E3192] min-[1024px]:text-[36px]">
                  Affordable Dental Care for a Healthy, Confident Smile
                </h2>
                <p className="leading-normal min-[1024px]:text-[22px]">
                  Your oral health is the foundation of your overall well-being
                  and confidence. The Smile Savings Plan by CosMediCenter is a
                  dental savings plan designed to make premium dental care
                  accessible and affordable. Whether you’re maintaining your
                  oral health, improving your smile with cosmetic treatments, or
                  managing a dental procedure, the{" "}
                  <Link href="#" className="font-[700] text-[#2E3192]">
                    Smile Savings Plan
                  </Link>{" "}
                  offers discounts on a wide range of services. With our plan,
                  you can prioritize your dental health while keeping your
                  budget intact, ensuring a brighter smile and a healthier you.
                </p>
              </div>
            </div>
            <div className="w-full min-[1024px]:w-5/12 ">
              <div className="m-auto mt-4 max-[992px]:max-w-[350px] min-[992px]:w-full">
                <Image
                  src="/img/dental-bnr.webp"
                  alt="app store"
                  width={500}
                  height={500}
                  className="h-auto w-full rounded-[4px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        <section className="join-us">
          <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="join relative rounded-[22px] bg-[url('/img/bg-join.jpg')] bg-cover ">
              <div className="container_">
                <div className="flex flex-wrap items-center">
                  <div className="max-[1024px]:pb-0">
                    <span>
                      <Image
                        src="/img/dh1.webp"
                        alt="app store"
                        width={500}
                        height={500}
                        className="h-[250px] w-full object-contain object-left min-[1024px]:mt-[0px]"
                      />
                    </span>
                  </div>
                  <div className="md:flex-1">
                    <div className="px-[20px] pb-[80px] pt-[80px] max-[1024px]:pb-[80px] max-[768px]:py-[25px] min-[1024px]:px-[50px]">
                      <h2 className="text-[30px] font-bold leading-[40px] text-white min-[1024px]:text-[40px] min-[1024px]:leading-[50px] ">
                        {" "}
                        Why Dental Health Matters
                      </h2>
                      <p className="pt-4 text-[16px] text-white min-[1024px]:text-[20px]">
                        Good oral hygiene is more than just a beautiful
                        smile—it’s essential for your overall health. Poor oral
                        health can lead to issues like gum disease, tooth loss,
                        and even systemic health conditions such as diabetes or
                        heart disease. Our subscriptions ensure that you don’t
                        have to delay care due to cost, helping you maintain
                        optimal dental health for life.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container mx-auto px-4 pb-12 md:pb-20">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-[18px] font-semibold text-[#92278F] min-[1024px]:text-[24px]">
                Membership Benefits
              </h2>
              <h1 className="text-3xl font-bold leading-normal min-[1024px]:text-[48px] min-[1024px]:leading-[58px]">
                Comprehensive Savings
                <br />
                on Dental Services
              </h1>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {services.map((service) => (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  description={service.description}
                  isSpecial={service.isSpecial}
                />
              ))}
            </div>
          </div>
        </section>
        {/* <section className="bg-[#2E3192]">
          <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 md:py-16 lg:px-8 lg:py-20">
            <div className="grid items-center gap-6 sm:gap-8 md:grid-cols-12 lg:gap-12">
              <div className="relative order-2 overflow-hidden rounded-2xl bg-white md:order-1 md:col-span-4">
                <div className="aspect-square w-full">
                  <Image
                    src="/img/wellness.png"
                    alt="Wellness lifestyle with healthy food and exercise"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>

              <div className="order-1 space-y-6 text-white sm:space-y-8 md:order-2 md:col-span-8">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
                  Wellness & Health-Focused Discounts
                </h1>

                <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                  <div className="space-y-2 sm:space-y-3">
                    <h2 className="text-lg font-semibold sm:text-xl md:text-2xl">
                      Gum Health Treatments
                    </h2>
                    <p className="text-sm text-indigo-100 sm:text-base">
                      Save on scaling, root planing, and other periodontal care
                      procedures to prevent gum disease.
                    </p>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <h2 className="text-lg font-semibold sm:text-xl md:text-2xl">
                      Oral Appliances
                    </h2>
                    <p className="text-sm text-indigo-100 sm:text-base">
                      Discounts on nightguards, mouthguards, and devices for
                      sleep apnea to protect your health.
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-t-[#FFFFFF33] pt-4 sm:space-y-3">
                    <h2 className="text-lg font-semibold sm:text-xl md:text-2xl">
                      Additional Perks
                    </h2>
                    <ul className="space-y-2 text-sm text-indigo-100 sm:space-y-3 sm:text-base">
                      <li className="flex items-start">
                        <span className="block">
                          Partnered discounts with orthodontists, oral surgeons,
                          and cosmetic dentists.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="block">
                          Savings on related wellness services, including meal
                          delivery plans for post-dental surgery recovery.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </div>
    </>
  );
};

export default CosMediCenterPage;
