"use client";

import { ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation"; // ✅ Import this
import { useState } from "react";
import FilterPopup from "./filter-popup";

interface LocationLabelProps {
  location: string;
  isLoggedIn: boolean;
}

export function LocationLabel({ location, isLoggedIn }: LocationLabelProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const searchParams = useSearchParams();

  const slc = searchParams.get("slc");
  const ssc = searchParams.get("ssc");
  const address = searchParams.get("address");
  const handleModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <button
        className="inline-flex w-full items-center !gap-1 rounded-md border-none bg-white px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={handleModal}
        aria-haspopup="true"
      >
        <div className="flex gap-2">
          <div>
            <svg
              width="20"
              height="18"
              viewBox="0 0 15 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.5 0C5.5116 ... Z" fill="#34373C" />
            </svg>
          </div>
          <span className="text-limit text-[16px] font-[500]">
            {isLoggedIn ? location : address || "Select Location"}
          </span>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-500" aria-hidden="true" />
      </button>

      {modalOpen && (
        <FilterPopup
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          isLoggedIn={isLoggedIn}
        />
      )}
    </>
  );
}
