import { SubscriptionType } from "@/types/subscription";
import Link from "next/link";
import React, { Suspense } from "react";
import SkeletonLoader from "./skeleton-loader";
import SubscriptionList from "./subscription-list";
type Plan = {
  id: number;
  uid: string;
  planName: string;
  interval: string;
  interval_count: number;
  type: string;
};

type SubscriptionItem = {
  uid: string;
  stripeSubscriptionId: string;
  status: boolean;
  subscription_amount: number;
  nextBillingDate: string;
  members_data: any[];
  created_at: string;
  plan: Plan;
};
type SubscriptionsObject = {
  [key: string]: SubscriptionItem;
};
const totalPlans = ["Dental", "Cosmetic", "Wellness", "All"];
function ShowSubscription({
  initialSubscriptions,
}: {
  initialSubscriptions: { subscriptions: SubscriptionsObject };
}) {
  const activePlanTypes = Object.keys(
    initialSubscriptions?.subscriptions || {},
  );

  const notActivePlans = totalPlans.filter(
    (item) => !activePlanTypes.includes(item),
  );

  return (
    <div className="flex flex-col gap-3 p-4 py-[40px]">
      <Suspense fallback={<SkeletonLoader />}>
        {Object.entries(initialSubscriptions?.subscriptions || {}).map(
          ([key, sub]) => (
            <SubscriptionList mySubscription={sub} key={key} />
          ),
        )}
        {notActivePlans.map((planType: any) => (
          <div key={planType}>
            <div>
              <div className=" flex flex-col justify-between gap-4 rounded-lg bg-[linear-gradient(93.73deg,_#561970_22.76%,_#2A5B9A_96.94%)] p-4 text-white min-[600px]:flex-row min-[600px]:items-center">
                <div className="flex gap-[20px]">
                  <div className="relative text-2xl"></div>
                  <div>
                    <h4 className="text-[16px] font-[600]">
                      <span></span>
                      <span className="opacity-[.74]"></span>
                    </h4>
                    <p className="text-[12px] text-sm font-[300] text-white">
                      Select the ideal plan that best aligns with your goals
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <div className="flex flex-1 flex-wrap items-center justify-center gap-4">
                      <div>
                        <Link
                          className="inline-block !min-h-[auto]  rounded-[45px] border border-[#fd9e11] bg-[#fd9e11] px-[18px] py-[10px] text-center !text-[14px] text-white transition-all duration-150 hover:bg-[#d89c43]"
                          href={`/subscription?${planType.toLowerCase()}`}
                        >
                          Add{" "}
                          {planType === SubscriptionType.Dental
                            ? "Dental"
                            : planType === SubscriptionType.Cosmetic
                              ? "Aesthetic"
                              : planType === SubscriptionType.Wellness
                                ? "Health & Wellness"
                                : "All-Inclusive"}{" "}
                          Plan
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Suspense>
    </div>
  );
}

export default React.memo(ShowSubscription);
