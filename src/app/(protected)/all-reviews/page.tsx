import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import { API } from "@/lib/fetch";
import { Metadata } from "next";
// import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import ReviewHeader from "./components/review-header";
import ReviewList from "./components/review-list";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "All Reviews",
  description: "Our Providers List",
};
// const ReviewList = dynamic(() => import("./componants/review-list"));
const Page = async (props: {
  searchParams?: Promise<{
    uid?: string;
  }>;
}) => {
  const searchParams = await props.searchParams;
  if (!searchParams?.uid) notFound();

  const { error, data, statusCode } = await API.GetAll(
    `ratings/clinic/${searchParams?.uid}`,
    {
      populate: ["ratings", "visit history", "patient"],
      sort: [["created_at", "desc"]],
    },
  );
  if (statusCode === 404) notFound();
  if (error) {
    throw new Error("Something went wrong");
  }
  // console.log(data?.ratings);

  return (
    <>
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "All Reviews" }]}
      />
      <div className="main_content_area bg-[#F6F8FB]">
        <div>
          <ReviewHeader
            clinic={data?.clinic}
            avgRating={data?.avg_rating}
            count={data?.count}
          />
        </div>
        <div className="review_list pt-4">
          <div className="container">
            <ReviewList review={data?.ratings} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
