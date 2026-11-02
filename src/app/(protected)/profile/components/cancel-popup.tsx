"use client";
import { revalidatePageFromClient } from "@/actions/auth.action";
import { subCancel } from "@/actions/sub-cancel.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CancelPopupProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  OffPopup: () => void;
  selectedplanUid?: string | "";
}

const CancelPopup = ({
  modalOpen,
  setModalOpen,
  OffPopup,
  selectedplanUid,
}: CancelPopupProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function statusUpdate() {
    setLoading(true);
    try {
      if (!selectedplanUid) {
        toast.error("Unable to cancel the subscription.");
        setLoading(false);
        return;
      }

      const { error, data } = await subCancel(selectedplanUid);
      if (error) {
        toast.error(error);
      } else {
        toast.success("Subscription cancelled successfully");
        setModalOpen(false);
        revalidatePageFromClient("qr-code");
        revalidatePageFromClient("profile");
        router.refresh();
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="cancel-dialog max-w-[400px] items-center justify-center overflow-hidden rounded-[20px] text-center  max-[600px]:w-[calc(100%-20px)]">
        <div>
          <DialogHeader>
            <DialogTitle className="text-center text-[26px] font-bold text-[#34373C] md:text-[30px]">
              Cancel Plan
            </DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <p className="text-[14px] text-gray-600 md:text-[16px]">
              Are you sure you want to cancel the subscription?
            </p>
          </DialogDescription>
          <DialogFooter className="!justify-center">
            <div className="mt-4 flex flex-wrap justify-center space-x-4 pt-4">
              <Button
                variant="outline"
                className="rounded-[16px] border border-[#AFAFAF] px-8 py-3 text-[16px]  md:px-12 md:py-6 md:text-[20px]"
                onClick={OffPopup}
              >
                No
              </Button>
              <Button
                variant="default"
                className="flex items-center rounded-[16px] border-[#7B2199] bg-[#7B2199] px-8 py-3 text-[16px] text-white md:px-12 md:py-6 md:text-[20px]"
                onClick={statusUpdate}
                disabled={loading}
              >
                {loading && <LoaderCircle className="mr-2 animate-spin" />}
                Yes
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CancelPopup;
