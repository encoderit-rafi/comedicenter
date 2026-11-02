import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SignInForm from "./componants/sign-in-cmt";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In",
};

const SignIn: React.FC = () => {
  return (
    <>
      <div className="bg-[url('/img/bg-banner.jpg')] bg-cover pb-[80px] pt-[120px] max-[768px]:min-h-[calc(100vh-300px)] min-[1100px]:pt-[200px]">
        <div className="rounded-sm">
          <div className="container">
            <div className="flex min-h-[calc(100vh-300px)] flex-wrap items-center justify-center">
              <div className="flex w-full flex-col flex-wrap items-center justify-center md:flex-row min-[1024px]:w-[100%]">
                <div className="w-[100%] rounded-[15px] bg-white p-8 md:w-[50%] min-[1024px]:mr-[-80px] min-[1024px]:min-h-[600px] min-[1024px]:p-[60px] min-[1024px]:pr-[60px] min-[1100px]:pr-[150px]">
                  <div className="pb-[50px]">
                    <h2 className="mb-2 text-[36px] font-bold text-[#34373C] min-[1100px]:text-[45px]">
                      Sign In
                    </h2>
                    <p className="mb-6 font-[400] text-[#34373C] md:w-[70%]">
                      Login to access your personalized{" "}
                      <span className="text-[#8F288F]">CosMediCenter</span>{" "}
                      experience
                    </p>
                  </div>
                  <SignInForm />
                  <div className="mt-6 flex flex-wrap justify-between text-center max-[930px]:justify-center">
                    <p className="pr-[20px] text-gray-600">
                      Don’t have an account?{" "}
                      <Link
                        href="/auth/signup"
                        className="text-[#266EB8] hover:underline"
                      >
                        Sign Up
                      </Link>
                    </p>
                    <p>
                      <Link
                        href="/auth/provider-login"
                        className="font-[600] text-[#266EB8] hover:underline"
                      >
                        Provider Access
                      </Link>
                    </p>
                  </div>
                </div>
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
