import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import Image from "next/image";
const loading = () => {
  return (
    <>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Our Providers" }]}
      />
      <div className="filter_nav bg-white py-3 shadow-[0_4px_5.5px_-3px_rgba(0,0,0,0.1)]">
        <div className="container">
          <div className="flex flex-wrap justify-between gap-3">
            <div className="filter_nav_left flex items-center">
              <button
                className="inline-flex items-center gap-6 rounded-md border-none bg-white px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-haspopup="true"
              >
                <div className="flex flex-wrap gap-2">
                  <MapPin
                    className="h-4 w-4 text-gray-500"
                    aria-hidden="true"
                  />
                  <div className="mb-2  h-3.5 w-32 animate-pulse rounded-full bg-gray-200"></div>
                </div>
              </button>
            </div>
            <div className="filter_nav_right flex flex-wrap gap-3 md:gap-8">
              <div className="flex flex-wrap gap-3">
                <Input
                  type="text"
                  placeholder="Search by practitioner or zip code"
                  className="flex-1 rounded-[15px] bg-white p-[20px] py-[15px] text-[18px] text-[#1D1D1D69] max-[600px]:w-full min-[1024px]:h-full min-[1024px]:w-[350px]"
                />
              </div>
              <div className="filter_btn flex">
                <div className="inline-flex cursor-pointer items-center gap-3 self-center rounded-[15px] bg-[#EBEBF9] px-[30px] py-[15px] text-[18px]">
                  <span>Filter</span>
                  <span className="flex-1">
                    <Image
                      src={"/img/filter-new.svg"}
                      alt="filter"
                      width={500}
                      height={500}
                      className="h-auto w-auto rounded-lg object-contain"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main_content_area">
        <div className="container">
          <div className="flex flex-wrap py-[20px]">
            <div className="w-full min-[1024px]:w-1/2">
              <div>
                {/* Doctor List */}
                <div className=" max-h-[100vh] space-y-4 overflow-hidden pb-[15px] pr-[15px]">
                  {/* Doctor Card */}
                  {[...Array(7)].map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center rounded-lg bg-white p-4 shadow-md"
                    >
                      <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700 ">
                        <svg
                          className="h-8 w-8 text-gray-200 dark:text-gray-600"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18"
                        >
                          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                      </div>
                      <div className="ml-4 flex flex-1 animate-pulse gap-4 max-[768px]:flex-wrap">
                        <div className="flex flex-col items-start justify-center min-[1024px]:w-1/2">
                          <div className="mb-2.5 h-3 w-36 rounded-full bg-gray-200 "></div>
                          <div className="mb-2.5 h-2 w-28 rounded-full bg-gray-200 "></div>
                        </div>

                        <div className="min-[1024px]:w-1/2">
                          <div className="mt-2 text-sm text-gray-500">
                            <div className="mb-2.5 h-2 w-24 animate-pulse rounded-full bg-gray-200 "></div>
                            {[...Array(3)].map((_, index) => (
                              <div
                                key={`${index}`}
                                className="mb-2.5 h-2 w-44 animate-pulse rounded-full bg-gray-200 "
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full min-[1024px]:w-1/2">
              <div className="mt-4 flex flex-col items-center bg-gray-100 p-4 md:p-0 min-[1024px]:mt-0 min-[1024px]:pl-4">
                {/* Profile Section */}
                <div className="flex w-full items-center justify-center overflow-hidden rounded-t-lg bg-gray-100 ">
                  {/* Profile Card */}
                  <div className="w-full rounded-lg bg-white shadow-md">
                    {/* Background Banner */}
                    <div className="relative h-40 rounded-t-lg bg-cover bg-center">
                      <span className="absolute left-0 top-0 z-0 h-full w-full backdrop-blur-[15px]"></span>
                      {/* Profile Image */}
                      <div className="absolute  -bottom-12 left-1/2 -translate-x-1/2 transform">
                        <div className="flex h-24 w-24  items-center justify-center rounded-full border-4 border-white bg-gray-300 dark:bg-gray-700 ">
                          <svg
                            className="h-8 w-8 text-gray-200 dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 18"
                          >
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Profile Details */}
                    <div className="flex w-full  flex-col items-center justify-center bg-gray-300 p-4 pt-16">
                      <div className="mb-2.5 h-4 w-44 animate-pulse rounded-full bg-gray-200 "></div>
                      <div className="mb-2.5 h-2.5 w-60 animate-pulse rounded-full bg-gray-200 "></div>
                      <div className="mb-2.5 h-2.5 w-20 animate-pulse rounded-full bg-gray-200 "></div>
                    </div>
                  </div>
                </div>
                {/* Clinics Section */}
                <div className="w-full max-w-2xl bg-white p-4 shadow-md">
                  <div className="mb-4 h-4 w-20 animate-pulse rounded-full bg-gray-200 "></div>
                  {[...Array(3)].map((_, index) => (
                    <div
                      key={index}
                      className="mb-4 flex items-start space-x-4 border-b pb-4 last:border-none"
                    >
                      <div className="flex h-20 w-20 animate-pulse  items-center justify-center rounded-lg bg-gray-300 dark:bg-gray-700 ">
                        <svg
                          className="h-12 w-12 text-gray-200 dark:text-gray-600"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18"
                        >
                          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                      </div>
                      <div className="animate-pulse">
                        <div className="mb-2.5 h-2.5 w-48 rounded-full bg-gray-200 "></div>
                        <div className="mb-2.5 h-2.5 w-16 rounded-full bg-gray-200 "></div>
                        <div className="mb-2.5 h-2.5 w-56 rounded-full bg-gray-200 "></div>
                        <div className="mt-2 text-xs text-gray-400"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default loading;
