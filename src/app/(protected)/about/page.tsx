import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import Image from "next/image";
import Link from "next/link";
export const dynamic = "force-dynamic";
export default function About() {
  return (
    <>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />
      <main className="min-h-screen">
        <section className="mx-auto">
          <div className="container relative mx-auto px-4">
            <div className="absolute bottom-[10px] right-0">
              <Image
                src="/img/loop.png"
                width={100}
                height={100}
                alt="Beauty and wellness"
                className="w-auto object-contain"
              />
            </div>
            <div className="relative items-center gap-8 py-12 md:py-20 min-[1024px]:grid min-[1024px]:grid-cols-12">
              <div className="space-y-6 min-[1024px]:col-span-6">
                <div className="min-[1024px]:pr-[50px]">
                  <h1 className="text-[30px] font-bold text-[#2E3192] min-[1024px]:text-[36px]">
                    Welcome to CosMediCenter – your all-in-one destination for
                    health, beauty, and wellness.
                  </h1>
                  <p className="pt-3 text-[18px] text-[#000000] min-[1024px]:text-[22px]">
                    At CosMediCenter, we believe that everyone deserves access
                    to high-quality, affordable care. We&apos;ve created an
                    innovative platform that connects patients with top-rated
                    providers in dentistry, cosmetic procedures, aesthetic,
                    wellness, and more. Our mission is to simplify your journey
                    to better health and beauty by providing the tools and
                    support you need to make informed decisions about your care.
                  </p>
                </div>
              </div>
              <div className="relative mt-4 flex justify-center min-[1024px]:col-span-6 min-[1024px]:mt-0">
                <Image
                  src="/img/cmc-logo-1.webp"
                  width={500}
                  height={500}
                  alt="Beauty and wellness"
                  className="w-full max-w-[400px] object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#92278F] py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center">
              <div className="min-[1024px]:w-5/12">
                <div className="min-[1024px]:pr-[30px]">
                  <h2 className="mb-4 text-[18px] font-[500] text-[#fff] min-[1024px]:text-[24px]">
                    What We Offer
                  </h2>
                  <h3 className="!mt-0 text-[28px] font-[700] text-[#fff] min-[1024px]:text-[32px]">
                    CosMediCenter combines cutting-edge technology with a
                    patient-first approach to bring you:
                  </h3>
                </div>
              </div>
              <div className="mt-2 min-[1024px]:mt-0 min-[1024px]:w-7/12">
                <div className="w-full">
                  <p className="text-[18px] text-[#FFFFFFD9] min-[1024px]:text-[22px]">
                    At CosMediCenter, we believe that everyone deserves access
                    to high-quality, affordable care. We&apos;ve created an
                    innovative platform that connects patients with top-rated
                    providers in dentistry, cosmetic esthetics, wellness, and
                    more. Our mission is to simplify your journey to better
                    health and beauty by providing the tools and support you
                    need to make informed decisions about your care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="join-us py-[80px] min-[1024px]:pt-[160px]">
          <div className="container">
            <div className="join relative m-auto mr-0 rounded-[22px] bg-[url('/img/bg-join.jpg')] bg-cover pt-[45px] max-[1024px]:pb-[45px] max-[768px]:pb-[30px] min-[1024px]:w-[calc(100%-50px)] ">
              <div className="container">
                <div className="flex flex-wrap min-[1024px]:ml-[-110px]">
                  <div className="flex self-end max-[1024px]:pb-[30px] md:w-4/12">
                    <span className="inline-flex w-full max-[1024px]:pr-[30px] ">
                      <Image
                        src="/img/join.webp"
                        alt="app store"
                        width={500}
                        height={500}
                        className="w-full rounded-lg object-contain min-[1024px]:mt-[-120px]"
                      />
                    </span>
                  </div>
                  <div className="md:w-8/12">
                    <div className="min-[1024px]:pl-[50px] ">
                      <div className="w-full pb-[40px] min-[1024px]:w-[70%]">
                        <h2 className="text-[30px] font-bold leading-[40px] text-white min-[1024px]:text-[40px] min-[1024px]:leading-[50px] ">
                          {" "}
                          Join Us
                        </h2>
                        <p className="pt-4 text-[16px] text-[#FFF] min-[1024px]:text-[20px]">
                          Ready to start your journey? Download the{" "}
                          <b>CosMediCenter</b> app today and discover how easy
                          it is to find affordable, high-quality care tailored
                          to your needs.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-3">
                          <Link
                            target="_blank"
                            href="https://apps.apple.com/us/app/cosmedicenter/id6746787814"
                          >
                            <Image
                              src="/img/app-store.svg"
                              alt="app store"
                              width={500}
                              height={500}
                              className="h-auto w-full rounded-[4px] object-contain"
                            />
                          </Link>
                          <Link
                            target="_blank"
                            href="https://play.google.com/store/apps/details?id=com.cosmedicenteruser"
                          >
                            <Image
                              src="/img/play-store.svg"
                              alt="app store"
                              width={500}
                              height={500}
                              className="h-auto w-full rounded-[4px] object-contain"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="m-auto mr-0 mt-[10px] py-4 min-[1024px]:w-[35%]">
              <p className="text-right text-[18px] font-[500] text-[#2E3192] min-[1024px]:text-[22px]">
                At CosMediCenter, your health, beauty, and wellness are always
                in focus.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
