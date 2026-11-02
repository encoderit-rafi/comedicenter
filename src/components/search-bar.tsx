"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";

export const SearchBar = ({ session }: { session: any }) => {
  const [search, setSearch] = useState<string>("");
  const { replace } = useRouter();
  const handleSearch = () => {
    if (!search.trim()) return;
    if (session?.user?.role && session?.user?.role !== "Patient") {
      // replace("/clinic");
      toast.error("Login as patient to see the result");
      return;
    }
    replace(`/our-providers?query=${search}`);
  };
  return (
    <div className="relative flex w-full items-center ">
      <Input
        type="text"
        // key={render ? 1 : 0}
        // defaultValue={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search by practitioner or zip code"
        className="input-banner h-full w-full flex-1 !rounded-[16px] bg-[#FBFBFF]  p-[20px] text-[18px] text-black max-[600px]:w-full min-[1024px]:w-full"
      />
      <span className="absolute right-[15px] w-[20px] transition-all duration-300 ease-in-out min-[768px]:w-[25px]">
        <svg
          onClick={handleSearch}
          width="100%"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          className="scale-100 cursor-pointer opacity-100 transition-all duration-1000 ease-in-out"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.9041 20.9284L29 29M24.3333 12.6667C24.3333 19.1099 19.1099 24.3333 12.6667 24.3333C6.22334 24.3333 1 19.1099 1 12.6667C1 6.22334 6.22334 1 12.6667 1C19.1099 1 24.3333 6.22334 24.3333 12.6667Z"
            stroke="#4F4F78"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
};
