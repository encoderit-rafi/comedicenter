"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export const dynamic = "force-dynamic";
export default function NotFound() {
  const router = useRouter();

  return (
    <div>
      <div className="container py-[50px] pt-[150px]">
        <div className="text-center">
          <span className="bg-gradient-to-b from-purple-700 via-red-600 to-blue-900 bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
            404
          </span>

          <h2 className="font-heading my-2 text-2xl font-bold">
            Something&apos;s missing
          </h2>
          <p>
            Sorry, the page you are looking for doesn&apos;t exist or has been
            moved
          </p>
          <div className="mt-[40px] flex justify-center gap-[20px]">
            <Button
              onClick={() => router.back()}
              className="!h-auto rounded-[16px] bg-[#7B2199] px-[25px] py-6 text-white hover:bg-purple-700 min-[768px]:w-[200px] min-[1024px]:!text-[18px]"
            >
              Go back
            </Button>
            <Button
              onClick={() => router.push("/")}
              className="!h-auto rounded-[16px] bg-[#7B2199] px-[25px] py-6 text-white hover:bg-purple-700 min-[768px]:w-[200px] min-[1024px]:!text-[18px]"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
