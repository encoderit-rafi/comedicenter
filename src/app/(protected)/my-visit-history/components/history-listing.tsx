"use client";
import { getVisitHisory } from "@/actions/visit-history.action";
import moment from "moment";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AddReview from "./add-review";

function HistoryListing({
  data,
  count,
  historyByUid,
}: {
  data: any;
  count: number;
  historyByUid: any;
}) {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(count > 10 ? true : false);
  const [page, setPage] = useState(1);
  const [histories, setHistories] = useState(data);
  const [selectedCenter, setSelectedCenter] = useState<any>();
  const [modalOpen, setModalOpen] = useState(false);
  const [render, setRender] = useState<boolean>(false);
  const handleWriteReviewClick = (item: any) => {
    setModalOpen(true);
    setSelectedCenter(item);
  };
  useEffect(() => {
    if (historyByUid && historyByUid?.length) {
      handleWriteReviewClick(historyByUid[0]);
    }
  }, []);
  const fetchMoreVisitHistory = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    const { error, data } = await getVisitHisory({
      limit: 10,
      offset: page * 10,
      sort: [["created_at", "desc"]],
      populate: ["rating"],
    });

    if (error) {
      setHasMore(false);
      setLoading(false);
      return;
    }
    setHistories((prev: any) => [...prev, ...(data?.visit_histories || [])]);

    // Correct pagination stop condition
    if (histories.length + (data?.visit_histories?.length || 0) >= count) {
      setHasMore(false);
    }

    setPage((prev) => prev + 1);
    setLoading(false);
  };
  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchMoreVisitHistory();
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  useEffect(() => {
    setRender((prev) => !prev);
    setHistories(data);
  }, [data]);
  return (
    <>
      <div key={render ? 1 : 0} className="flex flex-wrap py-[20px]">
        <div className="w-full">
          <div>
            <div className="bg-gray-50">
              {histories?.map((item: any, index: number) => (
                // <motion.div
                //   key={index}
                //   initial={{ opacity: 0, y: 10 }}
                //   animate={{ opacity: 1, y: 0 }}
                //   transition={{ duration: 0.1 * index }}
                // >
                <div
                  key={index}
                  className="mb-4 flex flex-wrap items-center gap-3 rounded-[11px] border border-[#E3E3E3] bg-white p-4"
                >
                  <Image
                    src={item?.clinic?.avatar || "/img/default-image-new.png"}
                    alt={item?.clinic?.name}
                    className="h-[90px] w-[90px] rounded-[10px] object-cover"
                    width={200}
                    height={200}
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    placeholder="blur"
                    blurDataURL="/img/default-image.jpg"
                  />
                  <div className="flex-grow">
                    <p className="text-[13px] font-[600] text-[#1C75BC]">
                      {" "}
                      {moment(item?.created_at).local().format("L")}
                    </p>
                    <h3 className="text-[20px] font-[600] text-[#34373C]">
                      {item?.clinic?.name}
                    </h3>
                    <p className="text-sm text-[#80809D]">
                      {" "}
                      {item?.clinic?.location?.address}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-8">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>
                            <svg
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M23.9223 9.54324C23.7432 9.01025 23.2819 8.62166 22.7264 8.5367L16.2618 7.54883L13.3581 1.36291C13.1105 0.83564 12.5813 0.5 12 0.5C11.4183 0.5 10.8895 0.83564 10.6419 1.36291L7.73776 7.54921L1.27317 8.53708C0.717723 8.62204 0.256375 9.01025 0.0777026 9.54362C-0.10097 10.077 0.0338917 10.6645 0.426666 11.0675L5.14758 15.9086L4.02945 22.7574C3.93726 23.3243 4.17764 23.8942 4.64661 24.2257C5.1152 24.5571 5.73388 24.5907 6.2379 24.3126L12.0004 21.1257L17.7628 24.3126C17.9903 24.4383 18.2406 24.5 18.4897 24.5C18.793 24.5 19.0962 24.4078 19.3541 24.2257C19.8231 23.8946 20.0631 23.3247 19.9709 22.7574L18.8528 15.9086L23.5741 11.0675C23.9661 10.6645 24.101 10.077 23.9223 9.54324Z"
                                fill={
                                  i < item?.rating?.rating
                                    ? "#FFBE19"
                                    : "#E1E1F3"
                                }
                              />
                            </svg>
                          </span>
                        ))}
                      </div>
                      {item.rating ? (
                        <span className="text-sm font-medium text-gray-700">
                          {item?.rating?.rating}.0
                        </span>
                      ) : null}
                    </div>
                    <button
                      className={`rounded-[45px] px-[20px] py-1 text-[14px] text-sm font-medium ${
                        item?.rating
                          ? "bg-[#2A5B9A] text-white "
                          : "border border-[#DADADA] text-[#1C75BC]"
                      }`}
                      onClick={() => handleWriteReviewClick(item)}
                    >
                      {item?.rating ? (
                        "View Review"
                      ) : (
                        <>
                          <div className="relative flex items-center gap-2">
                            <span className="absolute left-[-10px]">
                              <svg
                                width="13"
                                height="12"
                                viewBox="0 0 13 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1 5.69565H11.2273M6.11364 1V10.3913"
                                  stroke="#1C75BC"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span className="pl-[10px]">Write Review</span>
                          </div>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                // </motion.div>
              ))}
            </div>

            {
              // <div className="flex w-full items-center justify-center">
              //   <LoaderCircle className="mr-2 animate-spin text-[#92278F]" />
              // </div>
              loading && count > 10 && count !== histories?.length && (
                <div className="bg-gray-50">
                  <div className="mb-4 flex flex-wrap items-center gap-3 rounded-lg bg-white p-4 shadow-md">
                    <div className="mr-4 flex h-20 w-20 animate-pulse items-center justify-center  rounded-[10px] bg-gray-300 dark:bg-gray-700 ">
                      <svg
                        className="h-16 w-16 text-gray-200 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 18"
                      >
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                      </svg>
                    </div>
                    <div className="flex-grow animate-pulse">
                      <div className="mt-2 h-2.5 w-20 rounded-full bg-gray-200"></div>
                      <div className="mt-2 h-2.5 w-52 rounded-full bg-gray-200"></div>
                      <div className="mt-2 h-2.5 w-48 rounded-full bg-gray-200"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>
                            <svg
                              width="24"
                              height="25"
                              viewBox="0 0 24 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="animate-pulse"
                            >
                              <path
                                d="M23.9223 9.54324C23.7432 9.01025 23.2819 8.62166 22.7264 8.5367L16.2618 7.54883L13.3581 1.36291C13.1105 0.83564 12.5813 0.5 12 0.5C11.4183 0.5 10.8895 0.83564 10.6419 1.36291L7.73776 7.54921L1.27317 8.53708C0.717723 8.62204 0.256375 9.01025 0.0777026 9.54362C-0.10097 10.077 0.0338917 10.6645 0.426666 11.0675L5.14758 15.9086L4.02945 22.7574C3.93726 23.3243 4.17764 23.8942 4.64661 24.2257C5.1152 24.5571 5.73388 24.5907 6.2379 24.3126L12.0004 21.1257L17.7628 24.3126C17.9903 24.4383 18.2406 24.5 18.4897 24.5C18.793 24.5 19.0962 24.4078 19.3541 24.2257C19.8231 23.8946 20.0631 23.3247 19.9709 22.7574L18.8528 15.9086L23.5741 11.0675C23.9661 10.6645 24.101 10.077 23.9223 9.54324Z"
                                fill={"#D8DAE0"}
                              />
                            </svg>
                          </span>
                        ))}
                      </div>
                      <div className="mt-2 h-6 w-36 animate-pulse rounded-full bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>

      <AddReview
        selectedCenter={selectedCenter}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />

      <div ref={observerRef} className="h-10 w-full"></div>
    </>
  );
}

export default HistoryListing;
