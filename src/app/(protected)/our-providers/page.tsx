import { getClinics, getPublicClinics } from "@/actions/clinic.action";
import { auth } from "@/auth";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { API } from "@/lib/fetch";
import { cn, decodeValue } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FilterNav from "./component/action-bar";
import Clinic from "./component/clinic";
import ClinicalTiming from "./component/clinical-timing";
import ClinicRedirect from "./component/clinicRedirect";
export const metadata: Metadata = {
  title: "Our Providers",
  description: "Our Providers",
};
export const dynamic = "force-dynamic";
const OurProviders = async (props: {
  searchParams?: Promise<{
    uid?: string;
    speciality?: string;
    service?: string;
    query?: string;
    slc?: string;
    ssc?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const where: any = {};
  //  const where: any = { clinic_id: MyData?.data?.user?.clinic_id };

  const speciality = decodeValue(searchParams?.speciality || "");
  const service_categoryies = decodeValue(searchParams?.service || "");
  if (speciality) where["specialty_id"] = speciality;
  if (service_categoryies) where["service_categoryies"] = service_categoryies;
  if (searchParams?.query) where["search"] = searchParams?.query;

  const lat = searchParams?.slc || "";
  const lng = searchParams?.ssc || "";
  console.log("latxxx", lat);
  console.log("lngxxx", lng);

  const session = await auth();
  const isLoggedIn = !!session;
  if (!isLoggedIn) {
    if (lat) where["state_long_code"] = lat;
    if (lng) where["state_short_code"] = lng;
  }
  let clinicsPromise;
  if (isLoggedIn) {
    clinicsPromise = getClinics({ limit: 10, populate: ["users"], where });
  } else {
    // console.log("done");

    clinicsPromise = getPublicClinics({
      limit: 10,
      populate: ["users"],
      where,
      data: {
        state_long_code: lat,
        state_short_code: lng,
      },
    });
  }

  const [doctors, subscription, user] = await Promise.all([
    // getClinics({ limit: 10, populate: ["users"], where }),
    // getPublicClinics({ limit: 10, populate: ["users"], where }),
    clinicsPromise,
    API.Get("subscriptions/current"),
    API.Get("user/me", { populate: ["location"] }),
  ]);
  if (!!doctors?.error || !!subscription.error) {
    doctors.error, subscription.error;
    throw new Error("Something went wrong!");
  }
  const { data, error } = await API.Get(
    `user/details/${searchParams?.uid || doctors?.data?.users[0]?.uid}`,
  );
  return (
    <>
      <ClinicRedirect error={error} doctors={doctors} data={data} />

      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Our Providers" }]}
      />
      <FilterNav
        location={user?.data?.user?.location?.address}
        isLoggedIn={isLoggedIn}
      />
      <div className="main_content_area">
        <div className="container">
          <div className="flex flex-wrap py-[20px]">
            <div
              className={cn(
                "w-full min-[1024px]:w-1/2",
                doctors?.data?.users?.length === 0 &&
                  "mt-4 flex items-center  justify-center min-[1024px]:w-full",
              )}
            >
              <div>
                {Object.keys(subscription?.data?.subscriptions || {}).length ===
                  0 && (
                  <div className="mb-6 rounded-lg border border-[#E3E3E3] bg-[url('/img/bg-blue-map.jpg')] p-6 text-center text-white">
                    <h2 className="text-2xl font-bold">
                      Select the ideal plan that best aligns with your goals
                    </h2>
                    <p className="mt-2">
                      We have Transparent and simple pricing plans
                    </p>

                    <Link
                      // href="/subscription"
                      href={isLoggedIn ? "/subscription" : "/auth/signin"}
                      replace
                      className="mt-4 inline-block rounded-lg bg-[#7B2199] px-6 py-2 text-white hover:bg-purple-800"
                    >
                      Subscribe Now
                    </Link>
                  </div>
                )}
                <Clinic
                  initialData={doctors}
                  uid={searchParams?.uid}
                  isSubscribed={
                    Object.keys(subscription?.data?.subscriptions || {})
                      .length > 0
                  }
                />

                {doctors?.data?.users?.length === 0 && (
                  <div className=" flex w-full flex-col items-center justify-center">
                    <Image
                      src={"/img/no-image.png"}
                      alt={"no data"}
                      className="mr-4 h-28 w-28  "
                      width={200}
                      height={200}
                    />
                    <p className="py-5 text-gray-500">
                      {speciality ||
                      service_categoryies ||
                      !!searchParams?.query
                        ? "No results found"
                        : "No practitioners available in this location.Try changing your location"}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {doctors?.data?.users?.length > 0 && (
              <div
                className={cn(
                  "w-full overflow-auto md:max-h-screen min-[1024px]:w-1/2",
                  data?.clinics?.length > 2 && "md:scrollbar-custom",
                )}
              >
                <div className="mt-4 flex flex-col items-center bg-gray-100 p-4 max-[768px]:px-0 md:p-0 min-[1024px]:mt-0 min-[1024px]:pl-4">
                  <div className="flex w-full items-center justify-center overflow-hidden rounded-t-lg bg-gray-100 ">
                    <div className="w-full rounded-lg bg-white shadow-md">
                      <div
                        className="relative h-40 rounded-t-lg  bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${data?.doctor?.avatar || "/img/dummy-new.png"})`,
                        }}
                      >
                        <span className="absolute left-0 top-0 z-0 h-full w-full backdrop-blur-[15px]"></span>

                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 transform min-[1024px]:mb-[-30px]">
                          <Image
                            src={data?.doctor?.avatar || "/img/dummy-new.png"}
                            alt={data?.doctor?.name || "Dummy Image"}
                            width={200}
                            height={200}
                            className="h-[80px] w-[80px] rounded-full border-4 border-white bg-white object-cover min-[370px]:h-[120px] min-[370px]:w-[120px] min-[1024px]:h-[170px] min-[1024px]:w-[170px]"
                          />
                          {data?.doctor?.is_featured && (
                            <Badge className="absolute -bottom-1 left-[50%] z-10 -translate-x-1/2 transform cursor-default rounded-full bg-[#17A642] pb-0  pt-0.5 text-[10px] uppercase text-white hover:bg-[#17A642]">
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-center bg-[#1E125F] p-4 pt-[55px] text-center min-[1024px]:pt-[90px]">
                        <h2 className="text-limit5 !text-center text-[26px] font-bold text-white">
                          {data?.doctor?.name}
                        </h2>
                        <p className="text-white">
                          {data?.doctor?.practice?.specialty?.name && (
                            <span className="text-[19px] font-[600]">
                              {data?.doctor?.practice?.specialty?.name}
                            </span>
                          )}
                          {data?.doctor?.practice?.specialty?.name &&
                            data?.doctor?.practice?.service?.name && (
                              <span className="inline-block px-[10px]">
                                {" "}
                                |{" "}
                              </span>
                            )}

                          {data?.doctor?.practice?.service?.name && (
                            <>
                              <span className="text-[19px] font-[400]">
                                {data?.doctor?.practice?.service?.name}
                              </span>
                            </>
                          )}
                        </p>
                        <p className="mt-2 text-[19px] font-[600] text-white">
                          {data?.doctor?.license}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Clinics Section */}
                  {data?.clinics ? (
                    <div className="w-full bg-white p-4 shadow-md">
                      <h3 className="mb-4 text-lg font-[600] min-[1024px]:text-[22px]">
                        Clinics
                      </h3>
                      {data?.clinics?.map((clinic: any) => (
                        <div
                          key={clinic?.uid}
                          className="mb-4 border-b pb-4 last:border-none "
                        >
                          <div className="flex items-start space-x-4  max-[768px]:flex-col max-[768px]:gap-2 min-[1180px]:w-[78%]">
                            <Image
                              src={
                                clinic?.avatar || "/img/default-image-new.png"
                              }
                              alt={clinic?.name}
                              width={200}
                              height={200}
                              className="h-20 w-20 rounded-lg object-cover min-[1024px]:h-[115px] min-[1024px]:w-[115px]"
                            />
                            <div className="flex-1 max-[768px]:ml-[0px]">
                              <h4 className="text-lg font-[600] text-[#313131] min-[1024px]:text-[22px]">
                                {clinic?.name}
                              </h4>
                              {clinic?.average_rating && (
                                <div className="star">
                                  <Link
                                    href={`/all-reviews?uid=${clinic?.uid}`}
                                  >
                                    <div className="star-no flex items-center gap-1 text-[14px]">
                                      <Image
                                        src={"/img/star.svg"}
                                        alt="star rating"
                                        width={200}
                                        height={200}
                                        className="h-auto w-auto"
                                      />
                                      <span className="text-[14px] font-[400] text-[#1C1C1C]">
                                        {clinic?.average_rating}
                                      </span>
                                    </div>
                                  </Link>
                                </div>
                              )}
                              <p className="mt-2 text-[14px] font-[400] text-[#525252E0] ">
                                {clinic?.address}
                              </p>
                              <div className="mt-2 text-xs text-gray-400">
                                {!!clinic?.hours_of_operation && (
                                  <ClinicalTiming
                                    hours={clinic?.hours_of_operation}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
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
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OurProviders;
