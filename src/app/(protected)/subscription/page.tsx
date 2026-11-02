import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import ActionsFilter from "@/components/filter-slider/components/actions-filter";
import { API } from "@/lib/fetch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscription",
  description: "Subscription",
};
export const dynamic = "force-dynamic";

async function getAllSubscription() {
  try {
    const { data: allsubscriptions, error } = await API.GetAll("plans", {
      limit: -1,
      sort: [["price", "asc"]],
    });
    if (!!error) {
      throw new Error(error);
    }

    return allsubscriptions;
  } catch (error: any) {
    throw new Error(error);
  }
}
async function getAllcurrentSubscriptions() {
  try {
    const { data: currentSubscriptions, error } = await API.GetAll(
      "subscriptions/current",
      {
        limit: -1,
      },
    );
    if (error) {
      throw new Error(error);
    }
    // (currentSubscriptions,"currentSubscriptions");
    return currentSubscriptions;
  } catch (error: any) {
    throw new Error(error);
  }
}
async function getmyData() {
  try {
    const { data: myData, error } = await API.GetAll("user/me");
    if (error) {
      throw new Error(error);
    }
    // (currentSubscriptions,"currentSubscriptions");
    return myData;
  } catch (error: any) {
    throw new Error(error);
  }
}
async function Subscription() {
  let allsubdata, allcurrentsubdata, myData;
  try {
    allcurrentsubdata = await getAllcurrentSubscriptions();
    allsubdata = await getAllSubscription();
    myData = await getmyData();
  } catch (error: any) {
    console.error("Failed to fetch subscriptions:", error.message);
  }
  return (
    <>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Subscription" }]}
      />
      <div className="main_content_area bg-[#F6F8FB]">
        <div className="py-4">
          <div className="tab_filter">
            <div defaultValue="dental" className="w-full">
              <ActionsFilter
                plans={allsubdata?.plans}
                currentData={allcurrentsubdata?.subscriptions}
                myData={myData}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Subscription;
