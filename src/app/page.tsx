import Slick from "@/components/slider/provide-slider";
import { Metadata } from "next";
import Image from "next/image";

import { auth } from "@/auth";

import { getHomePageData } from "@/actions/home.action";
import { default as ContactForm } from "@/components/contact-form";
import Actions from "@/components/filter-slider/components/actions-filter";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
// import { VideoPlayer } from "@/components/video-player";
import VideoPlayer from "@/components/video-player";
import { API } from "@/lib/fetch";
export const dynamic = "force-dynamic";
// import { getUserByUid } from "@/actions/user.action";
export const metadata: Metadata = {
  title: "CosMediCenter",
  description: "Save on self-care, give back, and reimagine wellness.",
};

export default async function Home() {
  const session = await auth();
  const { data, error } = await getHomePageData();
  if (error) {
    console.error(error);
  }

  const [stateData, specialityData] = await Promise.all([
    API.GetAll("state", {
      limit: -1,
    }),
    API.GetAll("specialties", {
      limit: -1,
    }),
  ]);
  if (!!stateData.error || specialityData?.error) {
    console.log(stateData.error || specialityData?.error);
  }
  const { allsubdata = [], allcurrentsubdata = [], myData = null } = data || {};

  return (
    <>
      <section className="banner">
        <div className="banner w-full bg-[url('/img/bg-banner.jpg')] bg-cover bg-no-repeat pt-[80px]  min-[1600px]:h-screen ">
          <div className="container">
            <div className="flex flex-wrap items-center gap-3 py-[60px] min-[1024px]:flex-nowrap">
              <div className="w-full min-[1024px]:w-3/5">
                <div>
                  <div>
                    <h1 className="text-[28px] font-bold text-[#2E3192] min-[500px]:text-[38px] min-[1024px]:text-[58px] min-[1024px]:leading-[80px] ">
                      <span className="block">Cosmetic, Aesthetic</span>{" "}
                      <span className="block">and Dental Services at</span>{" "}
                      <span className="block">Affordable Prices</span>
                    </h1>
                  </div>
                  <div>
                    <p className="mt-3 text-[18px] font-[500] text-[#2E3192] min-[600px]:text-[24px]">
                      Get started today. Find your provider below.
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3 min-[1024px]:w-[70%]">
                    <SearchBar session={session} />
                  </div>
                </div>
                <div>
                  <div className="flex flex-wrap gap-[25px] px-[20px] pt-[40px] min-[600px]:justify-between md:pr-[100px]">
                    <div className="flex flex-col  text-left max-[600px]:w-1/2">
                      <div>
                        <Image
                          src="/img/affordable.svg"
                          alt="affordable"
                          width={50}
                          height={50}
                          className="h-auto w-[40px] object-contain"
                        />
                      </div>
                      <h3 className="mt-4 text-[24px] font-[500] text-[#92278F]">
                        Affordable
                      </h3>
                      <p className="text-[18px] font-[500] text-[#92278F] max-[600px]:text-[14px]">
                        Plans
                      </p>
                    </div>

                    {/* Find Your Ideal Plan */}
                    <div className="flex flex-col max-[600px]:w-1/2">
                      <div>
                        <Image
                          src="/img/search.svg"
                          alt="affordable"
                          width={50}
                          height={50}
                          className="h-auto w-[40px]  object-contain"
                        />
                      </div>
                      <h3 className="mt-4 text-[24px] font-[500] text-[#92278F]">
                        Find
                      </h3>
                      <p className="text-[18px] font-[500] text-[#92278F] max-[600px]:text-[14px]">
                        Your Ideal Plan
                      </p>
                    </div>

                    {/* Save On Dental Treatments */}
                    <div className="flex flex-col max-[600px]:w-1/2">
                      <div>
                        <Image
                          src="/img/save.svg"
                          alt="affordable"
                          width={50}
                          height={50}
                          className="h-auto w-[40px]  object-contain"
                        />
                      </div>
                      <h3 className="mt-4 text-[24px] font-[500] text-[#92278F]">
                        Save
                      </h3>
                      <p className="text-[18px] font-[500] text-[#92278F] max-[600px]:text-[14px]">
                        On procedures
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full min-[1024px]:w-2/5">
                <div className="min-[1100px]:py-[50px]">
                  <Image
                    src="/img/banner-cmc.png"
                    alt="app store"
                    width={500}
                    height={500}
                    className="hidden h-[500px] w-full rounded-lg object-contain  min-[1024px]:block min-[1024px]:h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="affordable-excellence">
        <div className="pb-[40px] pt-[80px]">
          <div className="sec_hd text-center">
            <h2 className="mb-4 text-[28px] font-bold leading-[40px] text-black min-[600px]:text-[36px] min-[1024px]:text-[48px] min-[1024px]:leading-[50px]">
              Affordable Excellence in Dental Care
            </h2>
            <p className="text-[18px] text-[#647589D9] min-[1024px]:text-[20px]">
              CosMediCenter offers affordable access to Cosmetic, Aesthetic and
              Dental Services
            </p>
          </div>

          <div className="ae_video relative m-auto mt-8  ">
            <div className="player-wrapper object-cover object-center">
              {/* <video
                controls
                muted
                loop
                autoPlay
                playsInline
                className="h-[270px] w-full object-cover min-[700px]:h-[380px] md:h-[500px]"
              >
                <source src="/video/cos-video.mp4" type="video/mp4" />
                <source src="/video/cos-video.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video> */}
              <VideoPlayer />
            </div>
          </div>
        </div>
      </section>
      <section className="we-provide">
        <div className="w-full">
          <Slick />
        </div>
      </section>
      <section className="dental-isurance bg-[#16151A] py-[80px]">
        <div className="container">
          <div className="flex flex-wrap items-center">
            <div className="w-full min-[600px]:w-6/12">
              <div className="max-[600px]:px-[40px]  min-[600px]:pr-[80px]">
                <Image
                  src="/img/cos-bridges.png"
                  alt="app store"
                  width={500}
                  height={500}
                  className="h-auto w-full rounded-lg object-contain"
                />
              </div>
            </div>
            <div className="w-full max-[600px]:pt-[50px] min-[600px]:w-6/12">
              <div>
                <h2 className="mb-4 text-[26px] font-bold leading-[40px] text-white min-[1024px]:text-[32px] min-[1024px]:leading-[50px]">
                  CosMediCenter bridges accessibility with affordability, making
                  high quality dental, beauty, and wellness services available
                  to everyone.
                </h2>
                <p className="text-[19px] text-white">
                  CosMediCenter plans give you instant access to providers in
                  your area, ensuring that dental care, health services, beauty
                  treatments and wellness solutions are within reach.
                </p>
                <div className=" mt-6">
                  <span className="text-[#AAAAAAFA]">
                    With CosMediCenter, you’ll get the coverage you need to keep
                    your teeth healthy without the restrictions of traditional
                    dental insurance.{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pricing-plans bg-white py-[80px]">
        <div className="container">
          <div className="ae_header flex flex-wrap gap-3">
            <div className="md:flex-1">
              <span className="inline-block pb-2 font-bold text-[#8C2B91]">
                Our Plans
              </span>
              <h2 className="text-[30px] font-bold leading-[40px] md:text-[45px]  min-[1024px]:leading-[55px]">
                <span className="block">Pricing & Plans</span>
              </h2>
            </div>
            <div className="md:flex-1">
              <p className="pb-4 text-[16px] font-[500] text-[#000]">
                CosMediCenter offers a range of flexible savings plans designed
                to provide affordable access to both dental and cosmetic
                services. Whether you&apos;re an individual, a family, or a
                business, our plans are tailored to meet your needs and help you
                save on essential care without the limitations of traditional
                insurance.
              </p>
            </div>
          </div>
        </div>
        <div className="tab_filter">
          <div defaultValue="dental" className="w-full">
            <Actions
              plans={allsubdata?.plans}
              myData={session}
              currentData={allcurrentsubdata?.subscriptions}
            />
          </div>
        </div>
      </section>
      <section className="join relative bg-[url('/img/bg-join.jpg')] bg-cover pt-[80px] max-[1024px]:pb-[80px]">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="max-[1024px]:pb-[30px] md:w-4/12">
              <span>
                <Image
                  src="/img/join.png"
                  alt="app store"
                  width={500}
                  height={500}
                  className="w-full rounded-lg object-contain min-[1024px]:mt-[-160px]"
                />
              </span>
            </div>
            <div className="md:w-8/12">
              <div className="pl-[30px] max-[768px]:pl-[0px] min-[1024px]:pl-[50px]">
                <h2 className="text-[30px] font-bold leading-[40px] text-white min-[1024px]:text-[40px] min-[1024px]:leading-[50px] ">
                  {" "}
                  Join Our Growing Network of Trusted Professionals{" "}
                </h2>
                <p className="pt-4 text-[18px] text-white">
                  Attract more patients and grow your practice by joining our
                  platform, where healthcare professionals connect with
                  individuals seeking quality care.
                </p>

                {(!stateData.error || !specialityData?.error) && (
                  <ContactForm
                    stateData={stateData.data?.states}
                    specialityData={specialityData?.data?.specialties}
                  >
                    {" "}
                    <Button className="mt-6 inline-block h-auto rounded-[10px] bg-[#7B2199] px-[50px] py-[15px] font-[600] text-white">
                      Contact
                    </Button>
                  </ContactForm>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
