import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import Image from "next/image";
export const dynamic = "force-dynamic";
const CmcCares = () => {
  return (
    <>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "CosMediCenter Cares" }]}
      />
      <div className="container">
        <div className="flex flex-col flex-wrap justify-between  py-8 md:flex-row md:py-16">
          <div className="min-[1024px]:w-7/12">
            <h1 className="text-[32px] font-bold leading-normal text-[#2E3192] min-[1024px]:text-[36px] min-[1024px]:leading-[50px]">
              Transforming Lives Through Compassionate Care
            </h1>
          </div>

          <div className="relative space-y-4 min-[1024px]:w-8/12">
            <div className="absolute right-[-80px] top-[-80px] hidden min-[1024px]:block">
              <Image
                src="/img/loop.png"
                width={100}
                height={100}
                alt="Beauty and wellness"
                className="w-auto object-contain"
              />
            </div>
            <div className="pt-[15px]">
              <p className="text-[18px] text-[#000] min-[1024px]:text-[22px]">
                At CosMediCenter, we believe in the power of giving back. Our
                charitable program is designed to connect deserving individuals
                with life-changing dental, aesthetic, and wellness care provided
                by our network of trusted providers.
              </p>
              <p className="mt-[15px] text-[18px] text-[#000] min-[1024px]:text-[22px]">
                Through this initiative, we invite patients, families, and
                communities to share stories of individuals in need—people who
                would greatly benefit from treatments that may otherwise be out
                of reach. Our team carefully reviews each submission and
                partners with CosMediCenter providers to deliver the care they
                deserve.
              </p>
              <p className="mt-[15px] text-[18px] text-[#000] min-[1024px]:text-[22px]">
                This isn&apos;t just about providing services; it&apos;s about
                creating a ripple effect of kindness and transformation. With
                the help of our dedicated providers, we&apos;re committed to
                improving lives, one patient at a time.
              </p>
              <p className="mt-[15px] text-[18px] text-[#000] min-[1024px]:text-[22px]">
                Together, we can make high-quality care accessible to those who
                need it most, reaffirming our mission to blend compassion,
                innovation, and accessibility in health, beauty, and wellness.
              </p>
            </div>
          </div>
          <div className="h-inherit h-full pt-[30px] min-[1024px]:mt-0 min-[1024px]:w-4/12 min-[1024px]:p-8">
            <div className=" h-full overflow-hidden rounded-[15px] ">
              <Image
                src="/img/cmc-care.webp"
                alt="app store"
                width={500}
                height={500}
                className="h-[300px] w-full rounded-[15px] object-cover min-[1024px]:h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CmcCares;
