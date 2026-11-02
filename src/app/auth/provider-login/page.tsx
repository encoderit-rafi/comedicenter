import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import SigninForm from "./componants/signin-form";
export const metadata: Metadata = {
  title: "Provider Login",
  description: "Provider Login",
};
export const dynamic = "force-dynamic";
const SignIn: React.FC = () => {
  return (
    <>
      <div className="bg-[url('/img/bg-banner.jpg')] bg-cover pb-[80px] pt-[120px] max-[768px]:min-h-[calc(100vh-300px)] min-[1100px]:pt-[200px]">
        <div className="rounded-sm">
          <div className="container">
            <div className="flex min-h-[calc(100vh-300px)] flex-wrap items-center justify-center">
              <div className="flex w-full flex-col flex-wrap items-center justify-center md:flex-row min-[1024px]:w-[100%]">
                {/* Left Section */}
                <SigninForm />
                {/* Right Section */}
                <div className="hidden w-full md:w-1/3  min-[1100px]:block">
                  <Image
                    src="/img/signin.png"
                    alt="Cosmetic service 1"
                    width={500}
                    height={500}
                    className="h-auto w-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
