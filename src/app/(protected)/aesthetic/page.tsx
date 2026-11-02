import { getUserData } from "@/actions/my-data.action";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ServiceCard } from "./components/service-card";

export const dynamic = "force-dynamic";
const services = [
  {
    title: "Cosmetic Surgery Discounts",
    description:
      "Save on liposuction, tummy tucks, and other body contouring surgeries to complement your weight loss journey.",
  },
  {
    title: "Fitness-Focused Benefits",
    description:
      "Reduced rates on gym memberships and fitness classes like yoga, spin, and Pilates to keep you moving.",
  },
  {
    title: "Meal Delivery Services",
    description:
      "Enjoy discounted meal plans designed for weight management and optimal health.",
  },
  {
    title: "Aesthetic Treatments",
    description:
      "Maintain a radiant glow with affordable Botox, fillers, facials, and more.",
  },
];
const benefits = [
  {
    text: "Affordable access to gym memberships for a stronger, more active you.",
  },
  {
    text: "Discounts on healthy meal delivery services to support nutrition and weight management.",
  },
  {
    text: "Cosmetic treatments that complement your commitment to a healthier lifestyle.",
  },
];
const CosMediCenterPage = async () => {
  const MyData = await getUserData();
  // console.log(!!MyData?.user, "MyData123");

  return (
    <>
      <div className="main_content_area bg-[#F6F8FB]">
        <div className="container mx-auto px-4 font-sans">
          <div className="flex flex-wrap items-center py-[50px]">
            <div className="w-full min-[1024px]:w-7/12">
              <div className="min-[1024px]:pr-[50px]">
                <h2 className="mb-5 text-[30px] font-[700] text-[#2E3192] min-[1024px]:text-[36px]">
                  Your Path to Beauty, Wellness, and a Healthy Lifestyle
                </h2>
                <p className="leading-normal min-[1024px]:text-[22px]">
                  At CosMediCenter, we believe that true beauty starts with
                  health and wellness. Looking and feeling your best isn’t just
                  about cosmetic treatments—it’s about living a healthy,
                  balanced life. Our savings plan empowers you to achieve your
                  aesthetic goals while supporting your overall well-being. With
                  exclusive discounts on cosmetic surgery, wellness services,
                  gyms, and meal delivery plans, CosMediCenter makes it easier
                  to stay healthy, confident, and vibrant.
                </p>
              </div>
            </div>
            <div className="mt-3 w-full min-[1024px]:mt-0 min-[1024px]:w-5/12">
              <div className="m-auto mt-4 max-[992px]:max-w-[350px] min-[992px]:w-full">
                <Image
                  src="/img/cos-bnr.webp"
                  alt="app store"
                  width={500}
                  height={500}
                  className="h-auto w-full rounded-[4px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        <section className="join-us py-[40px] min-[1024px]:py-[80px]">
          <div className="container">
            <div className="join relative m-auto mr-0 rounded-[22px] bg-[url('/img/bg-join.jpg')] bg-cover pt-[45px] max-[1024px]:pb-[80px] max-[768px]:pb-[30px] min-[1024px]:w-[calc(100%-50px)] ">
              <div className="container">
                <div className="flex flex-wrap min-[1024px]:ml-[-110px]">
                  <div className="flex self-end max-[1024px]:pb-[30px] md:w-4/12">
                    <span className="inline-flex w-full pr-4">
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
                    <div className="pb-[40px] min-[1024px]:pl-[50px]">
                      <h2 className="text-[30px] font-bold leading-[40px] text-white min-[1024px]:text-[40px] min-[1024px]:leading-[50px] ">
                        {" "}
                        Why Health is Beauty
                      </h2>
                      <p className="pt-4 text-[16px] text-white min-[1024px]:text-[20px]">
                        Being healthy isn’t just a trend—it’s a way of life. A
                        balanced lifestyle improves your energy, mood, and
                        confidence while amplifying the results of any beauty or
                        aesthetic treatment. The CosMediCenter plan encourages
                        you to take a holistic approach by offering:
                      </p>
                      <div className="pt-4">
                        {benefits.map((benefit, index) => (
                          <div
                            key={index}
                            className="group mb-1 flex items-start gap-3 text-white/90 opacity-[.85]"
                          >
                            <Check className="mt-0.5 h-6 w-6 flex-shrink-0 text-white" />
                            <p className="text-[16px] leading-relaxed min-[1024px]:text-[16px]">
                              {benefit.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-[18px] font-semibold text-[#92278F] min-[1024px]:text-[24px]">
                Membership Benefits
              </h2>
              <h1 className="text-3xl font-bold leading-normal min-[1024px]:text-[48px] min-[1024px]:leading-[58px]">
                Savings for a Healthier,
                <br />
                Happier You
              </h1>
            </div>

            <div className="!mt-0 flex flex-wrap min-[1024px]:!mt-4">
              {services.map((service) => (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  description={service.description}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="pb-[80px]">
          <div className="container mx-auto px-4 ">
            <h2 className="text-[40px] font-bold min-[1024px]:text-[48px] ">
              How It Works
            </h2>
            <div className="pt-[40px]">
              <div className="flex flex-wrap">
                <div className="w-full min-[1024px]:w-1/2">
                  <div className="mb-[30px]">
                    <div className="pb-3">
                      <Image
                        src="/img/hiw_01.svg"
                        alt="app store"
                        width={500}
                        height={500}
                        className="w-[80px] object-contain"
                      />
                    </div>
                    <h3 className="text-[25px] font-[700] text-[#2E3192] min-[1024px]:text-[30px]">
                      Join the Plan
                    </h3>
                    <p className="text-[16px] text-[#2E3192] min-[1024px]:pr-[50px] min-[1024px]:text-[20px]">
                      Sign up online or in-office and unlock immediate access to
                      exclusive savings.
                    </p>
                  </div>
                </div>
                <div className="w-full min-[1024px]:w-1/2">
                  <div className="mb-[30px]">
                    <div className="pb-3">
                      <Image
                        src="/img/hiw_02.svg"
                        alt="app store"
                        width={500}
                        height={500}
                        className="w-[80px] object-contain"
                      />
                    </div>
                    <h3 className="text-[25px] font-[700] text-[#2E3192] min-[1024px]:text-[30px]">
                      Use Our Easy-to-Use App
                    </h3>
                    <p className="text-[16px] text-[#2E3192] min-[1024px]:pr-[50px] min-[1024px]:text-[20px]">
                      Explore qualified providers and services tailored to your
                      needs through our intuitive application.
                    </p>
                  </div>
                </div>
                <div className="w-full min-[1024px]:w-1/2">
                  <div className="mb-[30px]">
                    <div className="pb-3">
                      <Image
                        src="/img/hiw_03.svg"
                        alt="app store"
                        width={500}
                        height={500}
                        className="w-[80px] object-contain"
                      />
                    </div>
                    <h3 className="text-[25px] font-[700] text-[#2E3192] min-[1024px]:text-[30px]">
                      Access Discounts on Services
                    </h3>
                    <p className="text-[16px] text-[#2E3192] min-[1024px]:pr-[50px] min-[1024px]:text-[20px]">
                      Save on treatments, memberships, and meal services
                      designed to help you reach your goals.
                    </p>
                  </div>
                </div>
                <div className="w-full min-[1024px]:w-1/2">
                  <div>
                    <div className="pb-3">
                      <Image
                        src="/img/hiw_04.svg"
                        alt="app store"
                        width={500}
                        height={500}
                        className="w-[80px] object-contain"
                      />
                    </div>
                    <h3 className="text-[25px] font-[700] text-[#2E3192] min-[1024px]:text-[30px]">
                      Live Beautifully & Confidently
                    </h3>
                    <p className="text-[16px] text-[#2E3192] min-[1024px]:pr-[50px] min-[1024px]:text-[20px]">
                      Let health and wellness fuel your aesthetic transformation
                      and overall well-being.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="health-journey-cta bg-[#92278F] pb-[40px] pt-[40px] min-[1024px]:pb-[80px] min-[1024px]:pt-[80px]">
          <div className="container">
            <div className="flex flex-wrap items-center">
              <div className="w-full min-[1024px]:w-1/2">
                <h2 className="mb-[20px] text-[36px] font-[700] text-white max-[768px]:leading-[46px] min-[768px]:text-[40px] min-[1024px]:text-[45px]">
                  Your Health Journey{" "}
                  <span className="min-[1024px]:block">Starts Here</span>
                </h2>
              </div>
              <div className="w-full min-[1024px]:w-1/2">
                <div>
                  <p className="text-[16px] text-[#FFFFFFD9] min-[1024px]:text-[18px]">
                    Being healthy is more than a goal—it’s a lifestyle.
                    CosMediCenter makes it easy to prioritize your wellness
                    while achieving the look you desire. Take the first step
                    today with our exclusive savings plan.
                  </p>
                  {!MyData?.user && (
                    <Link
                      href="/auth/signin"
                      className="mt-4 inline-block rounded-[10px] bg-[#FFFFFF] px-[40px] py-[15px] font-[600] text-[#92278F] min-[1024px]:text-[18px]"
                    >
                      JOIN NOW
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CosMediCenterPage;
