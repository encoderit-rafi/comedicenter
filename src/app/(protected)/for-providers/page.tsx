// pages/partner.tsx
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import ContactForm from "@/components/contact-form";
import { API } from "@/lib/fetch";
export const dynamic = "force-dynamic";
const PartnerPage = async () => {
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
  return (
    <>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "For Providers" }]}
      />
      <div className="container">
        <div className="flex flex-col flex-wrap items-center justify-between  py-8 md:flex-row md:py-16">
          <div className="space-y-4 md:w-7/12">
            <h1 className="text-[36px] font-bold text-[#2E3192] md:text-4xl">
              Partner with CosMediCenter
            </h1>
            <p className="text-[18px] text-[#000] min-[1024px]:text-[22px]">
              Join our program and access to individuals, families and groups
              already joined on our plans. Plus new members joining daily.
              CosMediCenter can also be used in your current practice to reward
              your valued patients, who'd appreciate savings. seems.
            </p>
          </div>
          <div className="mt-8 md:mt-0 md:w-4/12 md:p-8 ">
            <div className=" rounded-[15px] bg-[#7B2199] p-6 text-white">
              <h2 className="text-[26px] font-[700] md:text-[30px]">
                Let&apos;s work together to unite deserving patients with
                quality providers and services
              </h2>
              <div className="mt-4">
                <svg width="32" height="26" viewBox="0 0 32 26" fill="none">
                  <path
                    d="M2 13H29.0769M29.0769 13L17.7949 2M29.0769 13L17.7949 24"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {(!stateData.error || !specialityData?.error) && (
                <ContactForm
                  stateData={stateData.data?.states}
                  specialityData={specialityData?.data?.specialties}
                >
                  <span className="mt-8 inline-block w-full cursor-pointer rounded-[10px] bg-white px-6 py-[15px] text-center  text-[18px] font-[600] text-[#92278F] hover:bg-gray-100">
                    Click here
                  </span>
                </ContactForm>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerPage;
