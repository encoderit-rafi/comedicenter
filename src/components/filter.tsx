"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

// import SignUpCmt from "./componants/signup-cmt";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterNav: React.FC = () => {
  return (
    <>
      <div className="filter_nav bg-[#fff] py-3 shadow-[0_4px_5.5px_-3px_rgba(0,0,0,0.1)]">
        <div className="container">
          <div className="flex flex-wrap justify-between gap-3">
            <div className="filter_nav_left flex items-center">
              <Select>
                <SelectTrigger className="h-full w-[280px] rounded-[15px]">
                  <SelectValue placeholder="Select a Timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>North America</SelectLabel>
                    <SelectItem value="est">
                      Eastern Standard Time (EST)
                    </SelectItem>
                    <SelectItem value="cst">
                      Central Standard Time (CST)
                    </SelectItem>
                    <SelectItem value="mst">
                      Mountain Standard Time (MST)
                    </SelectItem>
                    <SelectItem value="pst">
                      Pacific Standard Time (PST)
                    </SelectItem>
                    <SelectItem value="akst">
                      Alaska Standard Time (AKST)
                    </SelectItem>
                    <SelectItem value="hst">
                      Hawaii Standard Time (HST)
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="filter_nav_right flex flex-wrap gap-3 md:gap-8">
              <div className="flex flex-wrap gap-3">
                <Input
                  type="text"
                  placeholder="Search by practitioner or zip code"
                  className="flex-1 rounded-[15px] bg-white p-[20px] py-[15px] text-[18px] text-[#1D1D1D69] max-[600px]:w-full min-[1024px]:h-full min-[1024px]:w-[350px]"
                />
                <Button className="height-inherit rounded-[15px] bg-[#7B2199] px-[30px] py-[15px] text-[18px] text-[#fff] max-[600px]:w-full min-[1024px]:h-full">
                  Search
                </Button>
              </div>
              <div className="filter_btn flex">
                <div className="inline-flex cursor-pointer items-center gap-3 self-center rounded-[15px] bg-[#EBEBF9] px-[30px] py-[15px] text-[18px]">
                  <span>Filter</span>
                  <span className="flex-1">
                    <Image
                      src={"/img/filter.svg"}
                      alt="filter"
                      width={500}
                      height={500}
                      className="h-auto w-auto rounded-lg object-contain"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterNav;
