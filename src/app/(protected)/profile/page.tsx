import { auth } from "@/auth";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import { API } from "@/lib/fetch";
import { formatPhone } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import EditProfile from "./components/edit-profile";
import ProfileImage from "./components/profile-image";
import ShowSubscription from "./components/show-subscription";

export const metadata: Metadata = {
  title: "Profile",
  description: "My Profile",
};
export const dynamic = "force-dynamic";
const Payment: React.FC = async () => {
  const session = await auth();
  const { data: currentSubscriptions, error } = await API.GetAll(
    "subscriptions/current",
    {
      limit: -1,
    },
  );
  // (currentSubscriptions?.subscriptions, "subscriptions data");

  if (!!error) {
    console.error("Failed to fetch subscriptions:", error);
  }
  const formattedPhone = session?.user?.phone
    ? formatPhone(session?.user?.phone)
    : "";

  const isEmptyObject = (obj: any) => {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  };
  return (
    <>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "My Profile" }]}
      />
      <div className="main_content_area flex min-h-[calc(100vh-300px)] items-center bg-[#F6F8FB] py-[40px]">
        <div className="mx-auto w-full max-w-[700px] space-y-4 p-4">
          <div className="flex w-full items-center justify-center overflow-hidden rounded-[10px] rounded-t-lg bg-gray-100 shadow">
            <div className="w-full rounded-lg bg-white shadow-md">
              <div className="relative z-0 h-[200px] rounded-t-lg bg-cover bg-center">
                <EditProfile session={session} />
                <ProfileImage session={session} />
              </div>

              <div className="bg-[#1E125F] p-4 pt-[80px] text-center min-[768px]:pt-[120px]">
                <div className="flex items-center justify-center">
                  <h2 className="text-limit3 text-[26px] font-bold text-white">
                    {session?.user?.name}
                  </h2>
                </div>
                <div className="mt-4 flex flex-col flex-wrap items-center justify-center gap-2 min-[991px]:flex-row min-[992px]:gap-[50px]">
                  <div className="flex flex-1 items-center space-x-2 text-white min-[991px]:justify-end">
                    <span>
                      <svg
                        width="20"
                        height="15"
                        viewBox="0 0 20 15"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.5 4.6875C0.5 2.09867 2.59867 0 5.1875 0H14.5625C17.1513 0 19.25 2.09867 19.25 4.6875V10.3125C19.25 12.9013 17.1513 15 14.5625 15H5.1875C2.59867 15 0.5 12.9013 0.5 10.3125V4.6875ZM5.1875 1.875C3.6342 1.875 2.375 3.1342 2.375 4.6875V10.3125C2.375 11.8658 3.6342 13.125 5.1875 13.125H14.5625C16.1158 13.125 17.375 11.8658 17.375 10.3125V4.6875C17.375 3.1342 16.1158 1.875 14.5625 1.875H5.1875Z"
                          fill="white"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.45571 4.10189C4.77916 3.69757 5.36912 3.63202 5.77344 3.95547L8.11831 5.83138C9.14553 6.6531 10.605 6.6531 11.6322 5.83138L13.9771 3.95547C14.3815 3.63202 14.9714 3.69757 15.2949 4.10189C15.6183 4.5062 15.5528 5.09616 15.1484 5.4196L12.8036 7.29547C11.0916 8.66507 8.65897 8.66507 6.94702 7.29547L4.60213 5.4196C4.19782 5.09616 4.13227 4.5062 4.45571 4.10189Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <span className="text-[16px]">{session?.user?.email}</span>
                  </div>
                  <div className="flex flex-1 items-center gap-2 text-white">
                    <span>
                      <svg
                        width="18"
                        height="17"
                        viewBox="0 0 18 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.302 16.9341C11.6514 16.5205 8.27224 15.3546 5.20879 12.2912C2.14536 9.22778 0.979471 5.84862 0.565908 4.19799C0.328244 3.2494 0.756221 2.33404 1.4819 1.81569L3.38433 0.456809C4.49746 -0.338277 6.04597 -0.0684766 6.8246 1.05622L8.02229 2.78624C8.53069 3.52061 8.35534 4.52712 7.62852 5.04627L6.67352 5.72843C6.81806 6.28129 7.2676 7.41666 8.67548 8.82453C10.0834 10.2324 11.2187 10.6819 11.7716 10.8264L12.4537 9.87141C12.9729 9.14468 13.9794 8.96924 14.7137 9.47765L16.4438 10.6754C17.5685 11.4541 17.8383 13.0025 17.0432 14.1156L15.6843 16.0181C15.1659 16.7438 14.2506 17.1718 13.302 16.9341ZM6.36435 11.1356C9.15022 13.9215 12.2245 14.9794 13.6991 15.3489C13.9147 15.4028 14.1753 15.3191 14.3545 15.0682L15.7134 13.1657C15.9784 12.7948 15.8885 12.2786 15.5135 12.019L13.7836 10.8213L13.0515 11.8462C12.7524 12.265 12.1991 12.5935 11.5549 12.4545C10.7509 12.2811 9.26454 11.7247 7.51993 9.98009C5.77532 8.23548 5.21895 6.74916 5.04546 5.94513C4.90647 5.30092 5.23498 4.74767 5.65381 4.4485L6.67867 3.71645L5.48096 1.98643C5.22141 1.61153 4.70525 1.5216 4.33421 1.78663L2.43177 3.14551C2.18089 3.32471 2.09713 3.58528 2.15113 3.80082C2.52061 5.27549 3.57852 8.34979 6.36435 11.1356Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <span className="text-[16px]">+1 {formattedPhone}</span>
                  </div>
                </div>
              </div>
              {session?.user?.role === "Patient" && (
                <>
                  {currentSubscriptions &&
                  !isEmptyObject(currentSubscriptions.subscriptions) ? (
                    <ShowSubscription
                      initialSubscriptions={currentSubscriptions}
                    />
                  ) : (
                    <div>
                      <div className="p-4">
                        <div className=" flex flex-col justify-between gap-4 rounded-lg bg-[linear-gradient(93.73deg,_#561970_22.76%,_#2A5B9A_96.94%)] p-4 text-white min-[600px]:flex-row min-[600px]:items-center">
                          <div className="flex gap-[20px]">
                            <div className="relative text-2xl"></div>
                            <div>
                              <h4 className="text-[16px] font-[600]">
                                <span></span>
                                <span className="opacity-[.74]"></span>
                              </h4>
                              <p className="text-[12px] text-sm font-[300] text-white">
                                Select the ideal plan that best aligns with your
                                goals
                              </p>
                            </div>
                          </div>
                          <div>
                            <div>
                              <div className="flex flex-1 flex-wrap items-center justify-center gap-4">
                                <div>
                                  <Link
                                    className="inline-block !min-h-[auto]  rounded-[45px] border border-[#fd9e11] bg-[#fd9e11] px-[40px] py-[10px] text-center !text-[14px] text-white transition-all duration-150 hover:bg-[#d89c43]"
                                    href="/subscription?dental"
                                  >
                                    Subscribe Now!
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
