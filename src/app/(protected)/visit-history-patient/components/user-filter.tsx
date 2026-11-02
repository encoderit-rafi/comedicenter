"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { DatePicker } from "../../users/components/date-picker";

export function UserFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get search parameters
  const searchQuery = searchParams.get("search") || "";
  const fromDateParam = searchParams.get("fromDate");
  const toDateParam = searchParams.get("toDate");

  // Local state for form inputs
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [fromDate, setFromDate] = useState<Date | undefined>(
    fromDateParam ? new Date(fromDateParam) : undefined,
  );
  const [toDate, setToDate] = useState<Date | undefined>(
    toDateParam ? new Date(toDateParam) : undefined,
  );

  // const filteredData = filterVisitHistory(
  //   VisitedHistory,
  //   searchQuery,
  //   fromDateParam,
  //   toDateParam,
  // );

  const formatDate = (date: Date) =>
    new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];

  const handleSearch = () => {
    if (fromDate && !toDate) {
      toast.error("Please select both 'From' and 'To' dates to proceed.");
      return;
    }
    if (toDate && !fromDate) {
      toast.error("Please select both 'From' and 'To' dates to proceed.");
      return;
    }
    const params = new URLSearchParams();
    if (searchInput) params.set("search", searchInput);
    if (fromDate) params.set("fromDate", formatDate(fromDate));
    if (toDate) params.set("toDate", formatDate(toDate));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleClear = () => {
    setSearchInput("");
    setFromDate(undefined);
    setToDate(undefined);
    router.push("?", { scroll: false });
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchInput(newValue);

    if (!newValue) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("search");
      router.push(`?${params.toString()}`, { scroll: false });
    }
  };

  const handleDateChange = (type: "from" | "to", date: Date | undefined) => {
    if (type === "from") {
      setFromDate(date);
      if (toDate && date && toDate < date) {
        setToDate(undefined);
      }
    } else {
      setToDate(date);
    }

    if (!date) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(type === "from" ? "fromDate" : "toDate");
      router.push(`?${params.toString()}`, { scroll: false });
    }
  };
  return (
    <>
      <div className="bg-[#FFFFFF] py-4 shadow-[0px_0px_10.6px_4px_rgba(0,0,0,0.06)]">
        <div className="container flex justify-end px-[20px]">
          <div className="w-full min-[1364px]:w-[85%]">
            <div className="flex flex-col flex-wrap gap-4 md:flex-row">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search by the user name"
                  className="rounded-[11px] bg-[#FBFBFF] text-[16px] min-[1024px]:w-full"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                />
              </div>
              <div className="flex-end flex h-[inherit] flex-1 gap-4 max-[1100px]:flex-wrap">
                <DatePicker
                  placeholder="From"
                  value={fromDate}
                  onChange={(date: any) => handleDateChange("from", date)}
                  disabled={(date) => (toDate ? date > toDate : false)}
                />

                <DatePicker
                  placeholder="To"
                  value={toDate}
                  onChange={(date: any) => handleDateChange("to", date)}
                  disabled={(date) => (fromDate ? date < fromDate : false)}
                />

                <Button
                  className="!min-h-[54px] rounded-[16px] bg-[#7B2199] !px-[40px] hover:bg-purple-700"
                  onClick={handleSearch}
                >
                  Search
                </Button>
                <Button
                  className="!min-h-[54px] rounded-[16px] bg-[#1F3144] !px-[40px] hover:bg-purple-700"
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
