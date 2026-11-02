"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [params, setParams] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("pathname", pathname);
    setParams(params.toString());
  }, [error, pathname, searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-[1024px]:py-[50px]">
      <span className="from-foreground bg-gradient-to-b to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        500
      </span>
      <h2 className="font-heading my-2 text-2xl font-bold">We&apos;re sorry</h2>
      <p>Something went wrong from our end. Please try after sometime.</p>
      <div className="mt-8 flex justify-center gap-2">
        <Button onClick={() => router.refresh()} variant="default" size="lg">
          Try again
        </Button>
      </div>
    </div>
  );
}
