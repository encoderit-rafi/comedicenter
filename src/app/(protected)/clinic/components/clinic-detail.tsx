"use client";
import { SwitchToClinic } from "@/components/clinic-switch/modal-clinic-switch";
import { VisitHistoryItem } from "@/types/visit-history";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import HeroSection from "./hero-section";
import VisitHistory from "./visit-history";

function ClinicDetail({
  VisitedHistory,
  MyData,
}: {
  VisitedHistory: VisitHistoryItem;
  MyData: any;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    const hasModalBeenClosed = localStorage.getItem("modalClosed");
    const hasMultipleClinics = MyData?.user?.doctor_clinics?.length > 1;
    if (!hasModalBeenClosed && hasMultipleClinics) {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    localStorage.setItem("modalClosed", "true");
  };
  return (
    <div>
      <div className="container flex min-h-screen flex-wrap">
        <div className="w-full p-6 max-[768px]:p-0 min-[768px]:w-6/12">
          <HeroSection MyData={MyData} />
        </div>

        <div className="w-full p-6 pl-0 max-[768px]:p-0 min-[768px]:w-6/12">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-[16px] font-[600] text-[#434343]">
              Recent visit history
            </h2>
            <Link href="/visit-history-patient">
              <span className="text-[13px] text-[#92278F] underline">
                View All
              </span>
            </Link>
          </div>
          {VisitedHistory?.visit_histories?.length > 0 ? (
            <VisitHistory
              VisitedHistory={VisitedHistory.visit_histories}
              MyData={MyData}
            />
          ) : (
            <div className="flex h-full items-center justify-center py-3">
              <div className="mx-auto flex flex-col items-center text-center">
                <Image
                  src={"/img/no-image.png"}
                  alt={"no data"}
                  className="mr-4 h-36 w-36 object-contain "
                  width={200}
                  height={200}
                />
                <span className=" text-[18px]">
                  You have no visit histories yet.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Clinic Switch */}
      <SwitchToClinic
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        MyData={MyData}
      />
    </div>
  );
}

export default ClinicDetail;
