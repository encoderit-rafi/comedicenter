"use client";

import Header from "@/components/main-header";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Logo } from "../Logo";
import Sidebar from "../main-sidebar";

export default function DefaultLayout({
  children,
  session,
  MyData,
  DoctorClinic,
  isSubscribed,
}: {
  children: React.ReactNode;
  session?: any;
  MyData?: any;
  DoctorClinic?: DoctorClinic;
  isSubscribed?: boolean;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isFormValidationpage = pathname.includes("/auth"); // Updated

  return (
    <>
      <div className="flex">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          session={session}
          DoctorClinic={DoctorClinic}
        />

        <div className="relative flex flex-1 flex-col">
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            isHomePage={isHomePage}
            isFormValidationpage={isFormValidationpage}
            session={session}
            MyData={MyData}
            DoctorClinic={DoctorClinic}
            isSubscribed={isSubscribed}
          />

          <main>{children}</main>

          {/* Footer */}
          <footer className="bg-[#16151A] pb-5 pt-10 text-white">
            <div className="container">
              <div className="flex flex-wrap gap-[30px] max-[992px]:flex-col">
                <div className="flex min-[992px]:w-1/2">
                  <div className="flex flex-col justify-between md:col-span-2">
                    <Link href="/">
                      <Logo />
                    </Link>
                    <div className="mt-4 flex space-x-4 pt-4">
                      <a
                        href="https://www.instagram.com/cosmedicentercare/"
                        target="_blank"
                        className="text-white hover:text-gray-400"
                      >
                        <Image
                          src={`/img/instagram.svg`}
                          alt={"instagram"}
                          width={20}
                          height={20}
                          className="h-[20px] w-[20px] object-contain object-center"
                        />
                      </a>
                      <a
                        href="https://www.tiktok.com/@cosmedicenter?_t=ZT-8wvSbLowQaU&_r=1"
                        target="_blank"
                        className="text-white hover:text-gray-400"
                      >
                        <Image
                          src={`/img/tiktok.svg`}
                          alt={"tiktok"}
                          width={20}
                          height={20}
                          className="h-[20px] w-[20px] object-contain object-center"
                        />
                      </a>
                    </div>
                    {/* <div className="mt-4 flex space-x-4 pt-4">
                      {[
                        "facebook",
                        "linked-in",
                        "x",
                        "instagram",
                        "tiktok",
                      ].map((platform) => (
                        <a
                          key={platform}
                          href="#"
                          className="text-white hover:text-gray-400"
                        >
                          <Image
                            src={`/img/${platform}.svg`}
                            alt={platform}
                            width={20}
                            height={20}
                            className="h-[20px] w-[20px] object-contain object-center"
                          />
                        </a>
                      ))}
                    </div> */}
                  </div>
                </div>
                <div className="flex flex-1 flex-wrap max-[600px]:gap-3 min-[992px]:w-1/2">
                  {/* Useful Links */}
                  <div className="w-full min-[600px]:w-1/2">
                    <h2 className="mb-4 text-[22px] font-bold md:text-[26px]">
                      Useful Links
                    </h2>
                    <ul>
                      {!MyData?.user && (
                        <li className="mb-2">
                          <Link
                            href="/auth/signup"
                            className="text-white hover:text-gray-400"
                          >
                            Join Us
                          </Link>
                        </li>
                      )}
                      <li className="mb-2">
                        <Link
                          href="/privacy-policy"
                          className="text-white hover:text-gray-400"
                        >
                          Privacy Policy
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link
                          href="terms-conditions"
                          className="text-white hover:text-gray-400"
                        >
                          Terms & Conditions
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link
                          href="/faq"
                          className="text-white hover:text-gray-400"
                        >
                          FAQ
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link
                          href="/contact"
                          className="text-white hover:text-gray-400"
                        >
                          Contact Us
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="w-full min-[600px]:w-1/2">
                    <h2 className="mb-4 text-[22px] font-bold md:text-[26px]">
                      Contact
                    </h2>
                    <p className="flex gap-2 text-white">
                      <span>
                        <Image
                          src={`/img/location1.svg`}
                          alt={"Location"}
                          width={20}
                          height={20}
                          className="h-[20px] w-[20px] object-contain object-center"
                        />
                      </span>
                      <span className="flex-1">Newark, New Jersey</span>
                    </p>
                    <p className="mt-2 flex gap-2 text-white">
                      <span>
                        <Image
                          src={`/img/call.svg`}
                          alt={"Location"}
                          width={20}
                          height={20}
                          className="h-[20px] w-[20px] object-contain object-center"
                        />
                      </span>
                      <span className="flex-1">
                        <a href="tel:+19733448170">+1 9733448170</a>
                      </span>
                    </p>
                    <p className="mt-2 flex gap-2 text-white">
                      <span>
                        <Image
                          src={`/img/mail1.svg`}
                          alt={"Location"}
                          width={20}
                          height={20}
                          className="h-[20px] w-[20px] object-contain object-center"
                        />
                      </span>
                      <span className="flex-1">
                        {" "}
                        <a href="mailto:info@cosmedicenter.com">
                          info@cosmedicenter.com
                        </a>{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-4 text-center text-[16px] font-[200] text-white opacity-[.76]">
              ©{String(new Date().getFullYear())} CosMediCenter, All rights
              reserved.
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
