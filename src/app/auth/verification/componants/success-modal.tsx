"use client";
import {
  getAddressFromCoordinates,
  postLocation,
} from "@/actions/location.action";
import { useAppContext } from "@/components/context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Address } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  hasButton?: boolean;
  desc: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  message,
  hasButton,
  desc,
}) => {
  const router = useRouter();
  const { signupData, setSignupData } = useAppContext(); // Use context
  const handleContinue = () => {
    onClose();
    setSignupData();
    router.replace("/our-providers");

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const addressDetails: any = await getAddressFromCoordinates(
              latitude,
              longitude,
            );
            if (!!addressDetails) {
              const { error, data } = await postLocation(
                addressDetails as Address,
              );
              if (!!data) {
                toast.success(`Location enabled successfully`);
                router.refresh();
              }
            }
          } catch (error) {
            toast.error("Failed to get current location");
          }
        },
        (error) => {
          console.warn("Location access denied:", error.message);
          toast("Location access denied.Some features may be limited.", {
            style: {
              background: "#ececec",
              color: "black",
              fontSize: "16px",
              borderRadius: "8px",
              padding: "12px",
            },
            icon: null,
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 60000,
          maximumAge: 0,
        },
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
    router.refresh();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleContinue}>
      <DialogContent className="success-modal max-w-[350px] !overflow-hidden !rounded-[30px]  max-[600px]:w-[calc(100%-20px)]">
        <DialogHeader>
          <DialogTitle className="mb-3 text-center text-[32px] font-semibold text-[#2D2B4E]">
            {message}
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-1 text-center text-gray-600">
              <p className="text-[16px]">{desc}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
        {hasButton && (
          <DialogFooter>
            <button
              onClick={handleContinue}
              className="inline-block w-full rounded-[16px] bg-[#7B2199] py-5 text-center text-[16px] font-[600] text-white min-[768px]:!text-[22px]"
            >
              Continue
            </button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
