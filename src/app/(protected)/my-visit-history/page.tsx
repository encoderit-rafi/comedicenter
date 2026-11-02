import { getVisitHisory } from "@/actions/visit-history.action";
import { auth } from "@/auth";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import { Metadata } from "next";
import Image from "next/image";
import HistoryListing from "./components/history-listing";
// import SignUpCmt from "./componants/signup-cmt";
export const metadata: Metadata = {
  title: "My visit history",
  description: "My visit history",
};
export const dynamic = "force-dynamic";
const Page = async (props: {
  searchParams?: Promise<{
    uid?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  const vistiData = searchParams?.uid
    ? await getVisitHisory({
        where: { uid: searchParams?.uid },
        populate: ["rating"],
      })
    : null;
  const session = await auth();
  const { error, data } = await getVisitHisory({
    limit: 10,
    sort: [["created_at", "desc"]],
    where: { patient_id: session?.user.id },
    populate: ["rating"],
  });
  if (error) {
    throw new Error(error);
  }
  return (
    <>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Visit History" }]}
      />
      <div className="main_content_area ">
        <div className="container ">
          <HistoryListing
            data={data?.visit_histories}
            count={data?.count}
            historyByUid={vistiData?.data?.visit_histories}
          />
          {data?.visit_histories?.length === 0 && (
            <div className="flex h-20  w-full flex-col items-center justify-center">
              <Image
                src={"/img/no-image.png"}
                alt={"no data"}
                className="mr-4 h-28 w-28 rounded-[10px] object-cover"
                width={200}
                height={200}
              />
              <span className="mt-[20px] block text-[22px]">
                {" "}
                You have no visit histories yet.
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
