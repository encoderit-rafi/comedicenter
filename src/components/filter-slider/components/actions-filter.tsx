"use client";
import { FilterSlider } from "@/components/filter-slider/filter-slider";
import { Button } from "@/components/ui/button";
import { TabType } from "@/types/subscription";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

type Plan = {
  id: string;
  type: string;
};

type TabProps = {
  plans: Plan[];
  currentData: any;
  myData: any;
};

const TABS = [
  { type: TabType.DENTAL, label: "Dental" },
  { type: TabType.COSMETIC, label: "Aesthetic" },
  { type: TabType.WELLNESS, label: "Health & Wellness" },
  { type: TabType.All, label: "All-Inclusive" },
] as const;

export default function ActionsFilter({
  plans,
  currentData,
  myData,
}: TabProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeTab = useMemo(() => {
    if (searchParams.has(TabType.COSMETIC)) return TabType.COSMETIC;
    if (searchParams.has(TabType.DENTAL)) return TabType.DENTAL;
    if (searchParams.has(TabType.WELLNESS)) return TabType.WELLNESS;
    if (searchParams.has(TabType.All)) return TabType.All;
    return TabType.DENTAL;
  }, [searchParams]);

  const [activeType, setActiveType] = useState<TabType>(activeTab);

  const filteredPlans = useMemo(() => {
    return (
      plans?.filter(
        (plan) => plan.type.toLowerCase() === activeType.toLowerCase(),
      ) ?? []
    );
  }, [activeType, plans]);

  const handleFilter = (type: TabType) => {
    setActiveType(type);
    router.replace(`?${type}`, { scroll: false });
  };

  return (
    <div>
      <div className="container">
        <div className="flex h-auto flex-wrap justify-start border-b border-b-[#ced7e0] bg-transparent p-0">
          {TABS.map((tab) => (
            <Button
              key={tab.type}
              className={`border-b-4 ${
                activeType === tab.type
                  ? "border-[#2E69B5] text-[#2E69B5]"
                  : "border-[#fff] text-[#000]"
              } rounded-none !bg-transparent !px-6 font-bold transition-all duration-300`}
              onClick={() => handleFilter(tab.type)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="active-data">
        <FilterSlider
          plans={filteredPlans}
          currentData={currentData}
          myData={myData}
        />
      </div>
    </div>
  );
}
