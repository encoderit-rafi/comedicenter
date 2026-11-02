import { auth } from "@/auth";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import { API } from "@/lib/fetch";
import { Metadata } from "next";
import QRCode from "react-qr-code";
import SubscriptionTile from "./components/subscription-tile";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "My QR Code",
  description: "My QR Code",
};

const page = async () => {
  const { error, data } = await API.Get("subscriptions/current");
  const isSubscribed = Object.keys(data?.subscriptions || {}).length !== 0;
  const session = await auth();
  return (
    <>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "My QR Code" }]}
      />
      <div className="main_content_area bg-[#F6F8FB] py-[50px]">
        <div className="mx-auto w-full max-w-[600px] rounded-lg border border-[#E3E3E3] bg-white p-6 shadow-md">
          <div className="mb-6 flex justify-center">
            {isSubscribed ? (
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "35%", width: "35%" }}
                value={session?.user?.uid || ""}
                viewBox={`0 0 256 256`}
              />
            ) : (
              <p> No data available</p>
            )}
          </div>

          {error && (
            <div className="flex flex-col gap-4 rounded-lg bg-[#E7F0FA] p-4 text-white">
              <div className="flex items-center gap-4">
                <div className="text-2xl"></div>
                <div className="w-full">
                  <p className="  w-full text-center  text-sm text-gray-700">
                    Failed to load subscription details,
                    <span className="block">Please try again.</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {Object.entries(data?.subscriptions || {}).map(
            ([key, subscription]) => (
              <SubscriptionTile key={key} subscription={subscription} />
            ),
          )}
        </div>
      </div>
    </>
  );
};

export default page;
