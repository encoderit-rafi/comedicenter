"use client";

import { getUserMe } from "@/actions/user.action";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DropdownNotification from "./dropdown-notification";
import DropdownUser from "./dropdown-user";
import ReviewPopup from "./review-popup";
// import DropdownNotification from "./dropdown-notification";
// import DropdownUser from "./dropdown-user";
// import ReviewPopup from "./review-popup";
const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
  isHomePage: string | boolean | undefined;
  isFormValidationpage: boolean;
  session?: any;
  MyData?: any;
  isSubscribed?: boolean;
  DoctorClinic?: DoctorClinic;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<string>("");
  const [isProfile, setIsProfile] = useState<boolean>(false);
  const [isNotification, setIsNotification] = useState<boolean>(false);
  const [reviewNeeded, setReviewNeeded] = useState<string>("");
  const [notifications, setNotifications] = useState<any[]>([]);
  const { update } = useSession();
  const fetchUserDetails = async () => {
    try {
      const { error, data, statusCode, message } = await getUserMe();
      if (statusCode === 401) {
        toast.error(message);
        router.push("auth/provider-login");
        return;
      }
      if (error) throw new Error(error);
      setIsNotification(data?.is_unread_notification);
      if (!!data?.is_unread_notification) {
        setNotifications([]);
      }
      setReviewNeeded(data?.user?.is_reviewe_needed);
      await update({ ...data?.user });
      router.refresh();
      setIsProfile(!isProfile);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setActiveItem(pathname);
    if (pathname.startsWith("/auth")) {
      setIsNotification(false);
      setNotifications([]);
    }

    if (!!props?.session) fetchUserDetails();
  }, [pathname]);

  return (
    <>
      <header
        className={`drop-shadow-1 dark:bg-boxdark top-0 z-[9] flex w-full bg-cover dark:drop-shadow-none ${
          props.isHomePage || props.isFormValidationpage
            ? "absolute"
            : "relative bg-[url('/img/bg-banner.jpg')]"
        }`}
      >
        <div className="container p-[15px]">
          <div className="shadow-2 flex flex-grow items-center justify-between gap-3 py-4 md:px-6 2xl:px-[15px]">
            <div className="header-left flex w-full items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-4 min-[1180px]:absolute ">
                <button
                  aria-controls="sidebar"
                  onClick={(e) => {
                    e.stopPropagation();
                    props.setSidebarOpen(!props.sidebarOpen);
                  }}
                  className="z-99999 dark:border-strokedark dark:bg-boxdark block rounded-sm border border-none bg-transparent p-1.5 shadow-sm min-[1180px]:!hidden"
                >
                  <span className="relative block h-6 w-6 cursor-pointer">
                    <span className="du-block absolute right-0 h-full w-full">
                      <span
                        className={`delay-[0] relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-white duration-200 ease-in-out dark:bg-white ${
                          !props.sidebarOpen && "!w-full delay-300"
                        }`}
                      ></span>
                      <span
                        className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-white delay-150 duration-200 ease-in-out dark:bg-white ${
                          !props.sidebarOpen && "delay-400 !w-full"
                        }`}
                      ></span>
                      <span
                        className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-white delay-200 duration-200 ease-in-out dark:bg-white ${
                          !props.sidebarOpen && "!w-full delay-500"
                        }`}
                      ></span>
                    </span>
                  </span>
                </button>
              </div>
              <div className="logo-div">
                <span>
                  <Link
                    href="/"
                    className={`${activeItem === "/" ? "active" : ""}`}
                  >
                    <Image
                      src="/img/logo.svg"
                      alt="profile cover"
                      className="h-auto w-[160px] rounded-tl-sm rounded-tr-sm object-cover object-center min-[500px]:w-[200px] min-[1024px]:w-[250px]"
                      width={300}
                      height={260}
                      priority
                    />
                  </Link>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="menu-list hidden gap-[15px] px-[30px] min-[1180px]:flex ">
                  <div
                    className={`menu-list-item text-black ${activeItem === "/" ? "active" : ""}`}
                  >
                    <span>
                      <Link href="/">Home</Link>
                    </span>
                  </div>
                  {/* {props?.session?.user?.role !== "Staff" ||
                    (props?.session?.user?.role !== "Doctor" && ( */}
                  <div
                    className={`menu-list-item text-black ${
                      activeItem === "/about" ? "active" : ""
                    }`}
                  >
                    <span>
                      <Link href="/about">About Us</Link>
                    </span>
                  </div>

                  <div
                    className={`menu-list-item text-black ${
                      activeItem === "/meals-and-nutrition" ? "active" : ""
                    }`}
                  >
                    <span>
                      <Link href="/meals-and-nutrition">Meals & Nutrition</Link>
                    </span>
                  </div>
                  {/* ))} */}

                  <div
                    className={`menu-list-item text-black ${activeItem === "/dental" && "active"}`}
                  >
                    <span>
                      <Link href="/dental">Dental</Link>
                    </span>
                  </div>
                  <div
                    className={`menu-list-item text-black ${activeItem === "/aesthetic" && "active"}`}
                  >
                    <span>
                      <Link href="/aesthetic">Aesthetic</Link>
                    </span>
                  </div>

                  <>
                    <div
                      className={`menu-list-item text-black ${activeItem === "/for-providers" && "active"}`}
                    >
                      <span>
                        <Link href="/for-providers">For Providers</Link>
                      </span>
                    </div>
                    {/* <div
                      className={`menu-list-item text-black ${activeItem === "/subscription" && "active"}`}
                    >
                      <span>
                        <Link href="/subscription">Our Plans</Link>
                      </span>
                    </div> */}

                    <div
                      className={`menu-list-item text-black ${activeItem === "/featured-providers" && "active"}`}
                    >
                      <span>
                        <Link href={"/featured-providers"}>
                          Featured Provider
                        </Link>
                      </span>
                    </div>
                  </>
                  <div
                    className={`menu-list-item text-black ${activeItem === "/cmc-cares" && "active"}`}
                  >
                    <span>
                      <Link href={"/cmc-cares"}>CMC Cares</Link>
                    </span>
                  </div>
                  {props?.session?.user?.role === "Patient" && (
                    <>
                      <div
                        className={`menu-list-item text-black ${activeItem === "/our-providers" && "active"}`}
                      >
                        <span>
                          <Link href="/our-providers">Our Providers</Link>
                        </span>
                      </div>

                      {/* <div
                        className={`menu-list-item text-black ${activeItem === "/my-visit-history" && "active"}`}
                      >
                        <span>
                          <Link href="/my-visit-history">Visit History</Link>
                        </span>
                      </div> */}
                    </>
                  )}

                  {props?.session?.user?.role &&
                    ["Staff", "Doctor"].includes(
                      props?.session?.user?.role,
                    ) && (
                      <>
                        <div
                          className={`menu-list-item text-black ${activeItem === "/clinic" && "active"}`}
                        >
                          <span>
                            <Link href="/clinic">Clinic</Link>
                          </span>
                        </div>
                      </>
                    )}
                </div>

                <div className="2xsm:gap-7 flex items-center gap-3">
                  {!!props?.session?.user ? (
                    <>
                      <ul className="2xsm:gap-4 flex items-center gap-2">
                        <DropdownNotification
                          isNotification={isNotification}
                          setIsNotification={setIsNotification}
                          notifications={notifications}
                          setNotifications={setNotifications}
                        />
                      </ul>
                      <DropdownUser
                        sessionme={props?.session}
                        isProfile={isProfile}
                        MyData={props?.MyData}
                        isSubscribed={props?.isSubscribed}
                        isAdmin={props?.DoctorClinic?.is_admin}
                      />
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-4">
                        <div>
                          <Link href="/auth/signup">
                            <span>Join Now</span>
                          </Link>
                        </div>
                        <div>
                          <Link
                            href="/auth/signin"
                            className="inline-block rounded-[10px] bg-[#7B2199] px-[25px] py-[10px] text-white"
                          >
                            Login
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {reviewNeeded && (
        <ReviewPopup
          reviewNeeded={reviewNeeded}
          setReviewNeeded={setReviewNeeded}
        />
      )}
    </>
  );
};

export default Header;
