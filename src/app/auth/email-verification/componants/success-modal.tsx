import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import React from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  hasButton?: boolean;
  desc: string;
}

const SuccessModal2: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  message,
  hasButton,
  desc,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="success-modal max-w-[350px] !overflow-hidden !rounded-[30px]  max-[600px]:w-[calc(100%-20px)]">
        <DialogHeader>
          <DialogTitle className="mb-3 text-center text-[32px] font-semibold text-[#2D2B4E]">
            <div>
              <div className="success-checkmark">
                <div className="check-icon">
                  <span className="icon-line line-tip"></span>
                  <span className="icon-line line-long"></span>
                  <div className="icon-circle"></div>
                  <div className="icon-fix"></div>
                </div>
              </div>
            </div>
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
            <Link
              href="/auth/signin"
              className="inline-block w-full rounded-[16px] bg-[#7B2199] py-5 text-center text-[20px] font-[600] text-white min-[768px]:!text-[22px]"
              onClick={onClose}
            >
              Continue
            </Link>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal2;
