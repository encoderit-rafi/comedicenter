"use client";
import { formatDateTime } from "@/lib/utils";
import { VisitHistoryItem } from "@/types/visit-history";
import VisitorCard from "./visitor-card";
interface VisitedHistoryProps {
  VisitedHistory: VisitHistoryItem[];
  MyData: any;
}
export default function VisitHistory({
  VisitedHistory,
  MyData,
}: VisitedHistoryProps) {
  return (
    <div className="w-full max-[700px]:pb-[20px]">
      <div className="scrollbar-custom space-y-3 overflow-auto p-0 pb-3 min-[992px]:max-h-[100vh]">
        {VisitedHistory?.map((visit: VisitHistoryItem) => (
          <VisitorCard
            key={visit?.id}
            name={visit?.patient?.name}
            time={formatDateTime(visit?.created_at, "MM/DD/YYYY, h:mma")}
            imageUrl={visit?.patient.avatar || "/img/dummy-new.png"}
          />
        ))}
      </div>
    </div>
  );
}
