"use client";
import { FilterSlider } from "@/components/filter-slider/filter-slider";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Tab({
  plans,
  currentData,
  myData,
}: {
  plans: any;
  currentData: any;
  myData: any;
}) {
  const searchParams = useSearchParams();
  const hasCosmetic = searchParams.has("Cosmetic");
  const hasDental = searchParams.has("Dental");
  const activeTab = hasCosmetic
    ? "Cosmetic"
    : hasDental
      ? "Dental"
      : "Wellness";
  const [filteredPlans, setFilteredPlans] = useState<any>(plans);
  const router = useRouter();

  const [activeType, setActiveType] = useState<string>(activeTab);

  useEffect(() => {
    setFilteredPlans(
      plans?.filter(
        (plan: any) => plan.type.toLowerCase() === activeType.toLowerCase(),
      ),
    );
  }, [activeType, plans]);

  console.log(filteredPlans, "filteredPlans");

  const handleFilter = (type: string) => {
    setActiveType(type);
    setFilteredPlans(plans?.filter((plan: any) => plan.type === type));
    const newUrl =
      type === "Dental"
        ? "?Dental"
        : type === "Cosmetic"
          ? "?Cosmetic"
          : "?Wellness";
    router.replace(newUrl, { scroll: false });
  };
  return (
    <div>
      <div className="container">
        <div className="flex h-auto flex-wrap justify-start border-b border-b-[#ced7e0] bg-transparent p-0">
          <Button
            className={`dental border-b-4 ${
              activeType === "Dental"
                ? "border-[#2E69B5] text-[#2E69B5]"
                : "border-[#fff] text-[#000]"
            } rounded-none !bg-transparent !px-6 font-bold transition-all duration-300`}
            onClick={() => handleFilter("Dental")}
          >
            Dental
          </Button>
          <Button
            className={`cosmetics border-b-4 ${
              activeType === "Cosmetic"
                ? "border-[#2E69B5] text-[#2E69B5]"
                : "border-[#fff] text-[#000]"
            } rounded-none !bg-transparent !px-6 font-bold transition-all duration-300`}
            onClick={() => handleFilter("Cosmetic")}
          >
            Aesthetic
          </Button>

          <Button
            className={`cosmetics border-b-4 ${
              activeType === "Wellness"
                ? "border-[#2E69B5] text-[#2E69B5]"
                : "border-[#fff] text-[#000]"
            } rounded-none !bg-transparent !px-6 font-bold transition-all duration-300`}
            onClick={() => handleFilter("Wellness")}
          >
            Health & Wellness
          </Button>
        </div>
      </div>
      <div className="active-data">
        <div>
          <FilterSlider
            plans={filteredPlans}
            currentData={currentData}
            myData={myData}
          />
        </div>
      </div>
    </div>
  );
}

export default Tab;
