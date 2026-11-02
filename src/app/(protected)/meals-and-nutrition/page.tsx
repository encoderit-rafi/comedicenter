import Image from "next/image";
import { ServiceCard } from "./components/service-card";

export const dynamic = "force-dynamic";
const services = [
  {
    description:
      "Help identify hidden dietary habits that may be holding you back",
  },
  {
    description:
      "Build realistic meal plans that support your wellness and aesthetic goals",
  },
  {
    description:
      "Offer support with emotional eating, cravings, and portion control",
  },
  {
    description:
      "Recommend foods that promote healthy skin, digestion, and metabolism",
  },
  {
    description: "Align your eating habits with your long-term lifestyle",
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
                  Nourish from Within
                </h2>
                <p className="leading-normal min-[1024px]:text-[22px]">
                  At CosMediCenter, we believe that the journey to a better you
                  begins from the inside out—and that starts with food. What you
                  eat plays a powerful role in how you feel, how you look, and
                  how your body functions every day.
                </p>
                <p className="mt-3 leading-normal min-[1024px]:text-[22px]">
                  Whether you’re working toward aesthetic goals, improving your
                  energy, managing weight, or simply looking to feel more in
                  control of your health, your nutrition matters. That’s why we
                  offer personalized support to help you make informed,
                  sustainable choices that align with your lifestyle and goals.
                </p>
              </div>
            </div>
            <div className="w-full min-[1024px]:w-5/12 ">
              <div className="m-auto mt-4 max-[992px]:max-w-[350px] min-[992px]:w-full">
                <Image
                  src="/img/meal.png"
                  alt="app store"
                  width={500}
                  height={500}
                  className="h-auto w-full rounded-[4px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        <section className="container mx-auto px-4 pb-12 md:pb-20">
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold leading-normal min-[1024px]:text-[48px] min-[1024px]:leading-[58px]">
                Why Consult with a
                <br />
                Nutritionist?
              </h1>
              <p className="text-[20px] text-[#92278F] min-[1024px]:text-[24px]">
                Consulting with a nutritionist can be a game-changer. They help
                you cut through the noise of diet culture, offering
                science-backed guidance tailored specifically to your body, your
                habits, and your needs. A nutritionist can:
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {services.map((service, i) => (
                <ServiceCard description={service.description} key={i} />
              ))}
            </div>
            <div>
              <p className="text-[20px] text-[#2E3192] min-[1024px]:text-[24px]">
                This isn’t about quick fixes—it’s about giving you the knowledge
                and tools to feel your best every day.
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className="container mx-auto px-4 pb-12 md:pb-20">
            <div className="items-center rounded-[22px] bg-[#fff] p-[30px] shadow-[0px_0px_20px_0px_#03989E33] min-[1024px]:flex min-[1024px]:gap-[50px] min-[1024px]:p-[50px] ">
              <div>
                <Image
                  src="/img/EC.png"
                  alt="app store"
                  width={500}
                  height={500}
                  className="h-[320px] w-full rounded-[4px] object-contain max-[1024px]:mb-3 max-[1024px]:h-[200px] max-[1024px]:w-auto"
                />
              </div>
              <div className="flex-1 min-[1024px]:pl-[20px]">
                <h2 className="mb-[20px] text-3xl font-bold leading-normal text-[#007D82] min-[1024px]:text-[48px] min-[1024px]:leading-[58px]">
                  Healthy Eating, Made Easy
                </h2>
                <p className="text-[16px] font-[500] text-[#007D82] min-[1024px]:text-[20px]">
                  To support your journey, we’ve partnered with{" "}
                  <span className="underline">Crave Meals</span>—a local meal
                  delivery service offering delicious, nutritionist-approved
                  meals that make eating well both simple and satisfying.
                  Whether you're recovering post-treatment or just looking to
                  stay on track, these meals are a convenient way to nourish
                  your body without the guesswork.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#92278F]">
          <div className="container">
            <div className="items-center max-[1024px]:py-[50px] min-[1024px]:flex">
              <div className="relative w-full max-[1024px]:hidden min-[1024px]:h-[400px] min-[1024px]:w-4/12">
                <div className="max-[1024px]:mb-3">
                  <Image
                    src="/img/self-care.png"
                    alt="app store"
                    width={500}
                    height={500}
                    className="bottom-0 h-[400px] w-auto  object-contain max-[500px]:h-[250px] min-[1024px]:absolute min-[1024px]:h-[calc(100%+40px)] min-[1024px]:w-full"
                  />
                </div>
              </div>
              <div className="w-full max-[1024px]:w-full min-[1024px]:w-8/12">
                <div className="min-[1024px]:pl-[40px]">
                  <h2 className="mb-[10px] text-3xl font-bold leading-normal text-[#fff] min-[1024px]:text-[48px] min-[1024px]:leading-[58px]">
                    Food is Self-Care{" "}
                  </h2>
                  <p className="text-[16px] font-[500] text-[#fff] opacity-[.85] min-[1024px]:text-[22px]">
                    At CosMediCenter, we treat food as more than just fuel—it's
                    a foundation of your self-care. Real, lasting transformation
                    starts within, and we’re here to support that journey every
                    step of the way.
                  </p>
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
