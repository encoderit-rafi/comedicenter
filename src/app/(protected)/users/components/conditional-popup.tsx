"use client";

import {
  postDoctorClinic,
  postEditDoctorClinic,
} from "@/actions/clinic.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
// import { z } from "zod";

interface ConditionalModalProps {
  isOpen: boolean;
  onClose: () => void;
  res: any;
  myData: any;
  setOpen: (open: boolean) => void;
  setShowConditionalModal: (show: boolean) => void;
  selectedUser?: any;
}

export function ConditionalModal({
  isOpen,
  onClose,
  res,
  setOpen,
  myData,
  setShowConditionalModal,
  selectedUser,
}: ConditionalModalProps) {
  const router = useRouter();
  //   console.log(selectedUser?.uid, "selectedUser in condi");

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async () => {
    setIsLoading(true);
    const payload = {
      user_id: Number(res?.data?.id),
      clinic_id: Number(myData?.user?.clinic?.id),
    };

    try {
      if (!!selectedUser) {
        await postEditDoctorClinic(payload, selectedUser?.uid);
        setOpen(false);
        setShowConditionalModal(false);
        toast.success("User updated successfully!");
        router.refresh();
      } else {
        await postDoctorClinic(payload);
        setOpen(false);
        setShowConditionalModal(false);
        toast.success("User created successfully!");
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to submit data:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "modal-backdrop") {
      onClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {isOpen && (
        <div id="modal-backdrop" onClick={handleBackdropClick}>
          <DialogContent
            className="overflow-hidden !rounded-[16px] max-[600px]:w-[calc(100%-20px)]"
            onClick={(e) => e.stopPropagation()}
          >
            <DialogHeader>
              <DialogTitle className="pr-[60px] text-left font-[500] leading-normal text-[#405168] max-[768px]:text-[18px] min-[1024px]:text-[22px]">
                This practitioner is already associated with another clinic.
                Proceed with the same?
              </DialogTitle>
              <DialogDescription className="scrollbar-custom max-h-[calc(100vh-150px)] space-y-3 overflow-y-auto pr-2 min-[992px]:h-auto min-[992px]:max-h-[550px]">
                <div>
                  <div className="item-props flex justify-between gap-2 py-[10px] text-left max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-[2px]">
                    <span className="text-[16px] font-[400] opacity-[.85] max-[600px]:text-[14px]">
                      Name
                    </span>
                    <span className="text-[16px] font-[500] text-[#000] max-[600px]:text-[14px]">
                      {res?.data?.name}
                    </span>
                  </div>
                  <div className="item-props flex justify-between gap-2 py-[10px] text-left max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-[2px]">
                    <span className="text-[16px] font-[400] opacity-[.85]">
                      Email Address
                    </span>
                    <span className="text-[16px] font-[500] text-[#000] max-[600px]:text-[14px]">
                      {res?.data?.email}
                    </span>
                  </div>
                  <div className="item-props flex justify-between gap-2 py-[10px] text-left max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-[2px]">
                    <span className="text-[16px] font-[400] opacity-[.85] max-[600px]:text-[14px]">
                      Phone
                    </span>
                    <span className="text-[16px] font-[500] text-[#000] max-[600px]:text-[14px]">
                      {res?.data?.phone}
                    </span>
                  </div>
                  <div className="item-props flex justify-between gap-2 py-[10px] text-left max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-[2px]">
                    <span className="text-[16px] font-[400] opacity-[.85] max-[600px]:text-[14px]">
                      Specialization
                    </span>
                    <span className="text-[16px] font-[500] text-[#000] max-[600px]:text-[14px]">
                      {res?.data?.practice?.specialty?.name || "NA"}
                    </span>
                  </div>
                  <div className="item-props flex justify-between gap-2 py-[10px] text-left max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-[2px]">
                    <span className="text-[16px] font-[400] opacity-[.85] max-[600px]:text-[14px]">
                      Service Category
                    </span>
                    <span className="text-[16px] font-[500] text-[#000] max-[600px]:text-[14px]">
                      {res?.data?.practice?.service?.name || "NA"}
                    </span>
                  </div>
                  <div className="item-props flex justify-between gap-2 py-[10px] text-left max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-[2px]">
                    <span className="text-[16px] font-[400] opacity-[.85] max-[600px]:text-[14px]">
                      Service
                    </span>
                    <span className="text-[16px] font-[500] text-[#000] max-[600px]:text-[14px]">
                      {res?.data?.practice?.service_category?.name || "NA"}
                    </span>
                  </div>
                  <div className="item-props flex justify-between gap-2 py-[10px] text-left max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-[2px]">
                    <span className="text-[16px] font-[400] opacity-[.85] max-[600px]:text-[14px]">
                      Licence Number
                    </span>
                    <span className="text-[16px] font-[500] text-[#000] max-[600px]:text-[14px]">
                      {res?.data?.license}
                    </span>
                  </div>
                </div>
                <div className="mt-[20px] flex flex-wrap justify-end gap-3">
                  <Button
                    type="submit"
                    className="!h-auto w-full border border-[#7B2199] bg-[#fff] px-[20px] py-[18px] text-[#7B2199] hover:!bg-[#fff] min-[400px]:flex-1"
                    onClick={onClose}
                  >
                    No, Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex !h-auto w-full gap-2 bg-[#7B2199] px-[20px] py-[18px] text-[#fff] hover:bg-purple-700 min-[400px]:flex-1"
                    onClick={onSubmit}
                  >
                    <span>
                      {isLoading && (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        </>
                      )}
                    </span>
                    Yes, Proceed
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </div>
      )}
    </Dialog>
  );
}
