"use client";
import { User } from "@/types/mydata";
import Image from "next/image";
import Link from "next/link";

interface MyDataProps {
  MyData: User;
}

export default function HeroSection({ MyData }: MyDataProps) {
  // console.log(MyData, "MyData clilll");

  return (
    <>
      <div className="relative">
        <div className="w-full">
          <div className="flex flex-col bg-[#f6f8fb] py-4 md:p-0">
            <div className="flex w-full items-center justify-center overflow-hidden rounded-t-lg bg-gray-100">
              <div className="w-full rounded-lg bg-white shadow-md">
                <div>
                  <div className="relative h-[200px] rounded-t-[10px] bg-cover bg-center">
                    <div>
                      <Image
                        src={
                          MyData?.user?.clinic?.avatar ||
                          "/img/default-image-new.png"
                        }
                        alt="Profile"
                        width={200}
                        height={200}
                        className="absolute left-0 right-0 h-full w-full object-cover"
                      />
                    </div>
                    <span className="absolute left-0 top-0 h-full w-full backdrop-blur-[15px]"></span>
                    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 transform">
                      <Image
                        src={
                          MyData?.user?.clinic?.avatar ||
                          "/img/default-image-new.png"
                        }
                        alt="Profile"
                        width={200}
                        height={200}
                        className="h-[190px] w-[190px] rounded-[20px] border-4 border-white bg-[#fff] object-cover max-[768px]:h-[150px]"
                      />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#450B78] via-[#3C2A88] to-[#021C6F] p-4 pb-10 pt-20 text-center">
                    <div className="mt-4">
                      {MyData?.average_rating && (
                        <Link
                          href={`/all-reviews?uid=${MyData?.user?.clinic?.uid}`}
                          className="flex items-center justify-center text-yellow-500"
                        >
                          <span className="text-[18px] font-[600]">
                            {MyData?.average_rating ? "★" : ""}
                          </span>
                          <span className="ml-1 text-[18px] font-[600] text-white">
                            {MyData?.average_rating || ""}
                          </span>
                        </Link>
                      )}
                      <h1 className="mt-2 text-[28px] font-[700] text-white">
                        {MyData?.user?.clinic?.name || "Clinic Name"}
                      </h1>
                      <p className="text-[16px] font-[400] text-[#fff]">
                        {MyData?.user?.clinic?.location?.address || "NA"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-b-[10px] border border-[#E3E3E3] bg-white p-4">
              <div className="flex items-center gap-2">
                <div>
                  <Image
                    src={"/img/clinic-welcome.svg"}
                    alt="User"
                    width={150}
                    height={150}
                    className="h-[200px] w-[200px] overflow-hidden object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-[18px] font-[500] text-[#0000008C] min-[1024px]:text-[22px]">
                    Welcome
                  </h3>
                  <div className="relative flex">
                    <h2 className="text-limit4 text-[25px] font-[600] min-[1024px]:text-[30px]">
                      {MyData?.user?.name || "No user"}
                    </h2>
                    <span className="text-[25px] font-[600] min-[1024px]:text-[30px]">
                      !
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
