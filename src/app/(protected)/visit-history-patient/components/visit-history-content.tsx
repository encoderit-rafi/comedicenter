"use client";
import { getVisitHistoryPaginate } from "@/actions/visit-history.action";
import { UserCardSkeletonList } from "@/components/skeleton-filter/loader";
import { formatDateTime } from "@/lib/utils";
import type { VisitHistory } from "@/types/patient-visit";
import { motion } from "framer-motion";
import moment from "moment";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { UserCard } from "./user-card";
import { UserFilter } from "./user-filter";

export default function VisitHistoryPatientPage({
  params,
  MyData,
}: {
  params: any;
  MyData: any;
}) {
  const [visitedHistory, setVisitedHistory] = useState<VisitHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const router = useRouter();

  const paramsRef = useRef({
    fromDate: params?.fromDate,
    toDate: params?.toDate,
    clinic_id: MyData?.data?.user?.clinic_id,
  });

  const fetchVisitHistory = useCallback(
    async (isNewFilter = false) => {
      if ((!hasMore || loading) && !isNewFilter) return;

      if (!isNewFilter) {
        setLoading(true);
      }

      try {
        const where: any = { clinic_id: MyData?.data?.user?.clinic_id };

        if (params?.fromDate && params?.toDate) {
          where["created_at"] = {
            $gte: moment.utc(params.fromDate).startOf("day").toISOString(),
            $lte: moment.utc(params.toDate).endOf("day").toISOString(),
          };
        }

        const currentPage = isNewFilter ? 1 : pagesLoaded;

        const queryParams = {
          limit: 10,
          offset: (currentPage - 1) * 10,
          where,
          sort: [["created_at", "desc"]],
        };

        const response = await getVisitHistoryPaginate(
          queryParams,
          currentPage,
        );

        if (response.statusCode === 404) {
          return notFound();
        }

        if (response.error) {
          throw new Error("Something went wrong");
        }

        setVisitedHistory((prev) =>
          isNewFilter || currentPage === 1
            ? response.data.visit_histories
            : [...prev, ...response.data.visit_histories],
        );

        setPagesLoaded((prev) => (isNewFilter ? 2 : prev + 1));
        setHasMore(response.data.visit_histories.length === 10);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
        setIsFirstLoad(false);
      }
    },
    [
      loading,
      pagesLoaded,
      hasMore,
      MyData?.data?.user?.clinic_id,
      params?.fromDate,
      params?.toDate,
    ],
  );

  // Initial data load
  useEffect(() => {
    if (MyData?.data?.user?.clinic_id) {
      fetchVisitHistory(true);
    }
  }, [MyData?.data?.user?.clinic_id]);

  useEffect(() => {
    if (
      paramsRef.current.fromDate !== params?.fromDate ||
      paramsRef.current.toDate !== params?.toDate ||
      paramsRef.current.clinic_id !== MyData?.data?.user?.clinic_id
    ) {
      paramsRef.current = {
        fromDate: params?.fromDate,
        toDate: params?.toDate,
        clinic_id: MyData?.data?.user?.clinic_id,
      };
      setVisitedHistory([]);
      setPagesLoaded(1);
      setHasMore(true);
      setIsFirstLoad(true);
      setLoading(true);
      fetchVisitHistory(true);
    }
  }, [
    params?.fromDate,
    params?.toDate,
    MyData?.data?.user?.clinic_id,
    fetchVisitHistory,
  ]);

  // Infinite scroll setup
  useEffect(() => {
    if (!hasMore || loading) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        fetchVisitHistory();
      }
    };

    const loadMoreElement = document.querySelector("#load-more");
    if (loadMoreElement) {
      observer.current = new IntersectionObserver(observerCallback);
      observer.current.observe(loadMoreElement);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loading, hasMore, fetchVisitHistory]);

  // Filter by search term
  const filtered = params?.search
    ? visitedHistory.filter((visit) =>
        visit?.patient?.name
          ?.toLowerCase()
          ?.includes(params?.search?.toLowerCase()),
      )
    : visitedHistory;

  return (
    <div>
      <UserFilter />
      <div className="container mx-auto min-h-[calc(100vh-300px)] px-4 py-8">
        <div className="space-y-8">
          {loading && isFirstLoad ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <UserCardSkeletonList />
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {filtered.map((visit, index) => (
                <motion.div
                  key={`${visit?.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <UserCard
                    name={visit?.patient?.name}
                    imageUrl={visit?.patient?.avatar || ""}
                    role={
                      visit?.doctor_clinic
                        ? visit.doctor_clinic.role
                        : visit?.provider?.role || ""
                    }
                    timestamp={formatDateTime(
                      visit?.created_at,
                      "MM/DD/YYYY, h:mma",
                    )}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center gap-2 py-3">
              <div className="mx-auto flex flex-col items-center justify-center text-center">
                <Image
                  src="/img/nodata.svg"
                  alt="No Data"
                  width={150}
                  height={150}
                  style={{ width: "80px", height: "auto" }}
                  className="object-contain"
                />
                <span className="mt-5 text-[18px]">
                  {params?.fromDate || params?.toDate || params?.search
                    ? "No results found"
                    : "You have no visit histories yet."}
                </span>
              </div>
            </div>
          )}
          <div id="load-more"></div>
          {loading && !isFirstLoad && filtered.length !== 0 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <UserCardSkeletonList />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
