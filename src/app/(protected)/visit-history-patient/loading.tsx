import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import { Card } from "@/components/ui/card";

interface SkeletonLoaderProps {
  count?: number;
}

function SkeletonItem() {
  return (
    <Card className="w-full space-y-4 rounded-lg border border-gray-200 p-4 shadow">
      <div className="flex items-center gap-4 p-1">
        <div className="h-[80px] w-[80px] animate-pulse rounded-full bg-gray-200"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 animate-pulse rounded bg-gray-200"></div>
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>
    </Card>
  );
}

export default function SkeletonLoader({ count = 6 }: SkeletonLoaderProps) {
  const isDisabled = true;
  return (
    <>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Visit History" }]}
      />
      <div className="bg-[#FFFFFF] py-4 shadow-[0px_0px_10.6px_4px_rgba(0,0,0,0.06)]">
        <div className="container flex justify-end">
          <div className="w-full min-[1364px]:w-[85%]">
            <div className="flex flex-col flex-wrap gap-4 md:flex-row">
              <div className="flex-1">
                <div className="h-[54px] rounded-[11px] bg-gray-200 text-[16px] "></div>
              </div>
              <div className="flex-end flex h-[inherit] flex-1 gap-4 max-[1100px]:flex-wrap">
                <div className="rounded-[16px] bg-gray-200 min-[1200px]:w-[230px]"></div>
                <div className="rounded-[16px] bg-gray-200 min-[1200px]:w-[230px]"></div>
                <div className="!min-h-[54px] rounded-[16px] bg-gray-200 !px-[40px]">
                  <span className="inline-block w-[47px]"></span>
                </div>
                <div className="!min-h-[54px] rounded-[16px] bg-gray-200 !px-[40px]">
                  <span className="inline-block w-[47px]"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto min-h-[calc(100vh-300px)] px-4 py-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: count }).map((_, index) => (
            <SkeletonItem key={index} />
          ))}
        </div>
      </div>
    </>
  );
}
