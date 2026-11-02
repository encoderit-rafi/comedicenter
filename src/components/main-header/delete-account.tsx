"use client";
import { deleteMe } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { errorToast } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

const DeleteAccountModal = ({
  show,
  setShow,
  isSubscribed,
}: {
  show: boolean;
  isSubscribed: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const handleDelete = async () => {
    setLoading(true);
    try {
      const { error, data } = await deleteMe(session?.user?.uid as string);
      if (error) throw new Error(error);
      toast.success(
        "Your account has been successfully deleted. We're sorry to see you go!",
      );
      router.replace("/auth/signin");
      setShow(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorToast(error);
    }
  };
  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className="cancel-dialog max-w-[400px] items-center justify-center overflow-hidden rounded-[20px] text-center  max-[600px]:w-[calc(100%-20px)]">
        <div>
          <DialogHeader>
            <DialogTitle className="text-center text-[26px] font-bold text-[#343462] md:text-[30px]">
              Delete Account
            </DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <p className="text-[14px] text-[#405168] md:text-[16px]">
              {isSubscribed
                ? "You have an active subscription. Deleting your account will cancel your subscription and stop access to its benefits. Are you sure you want to proceed?"
                : "Are you sure you want to delete this account?"}
            </p>
          </DialogDescription>
          <DialogFooter className="!justify-center">
            <div className="mt-4 flex flex-wrap justify-center space-x-4 pt-4">
              <Button
                variant="outline"
                className="rounded-[16px] border border-[#AFAFAF] px-8 py-3 text-[16px]  md:px-12 md:py-6 md:text-[20px]"
                onClick={() => setShow(false)}
              >
                No
              </Button>
              <Button
                variant="default"
                className="flex gap-1 rounded-[16px] border-[#7B2199] bg-[#7B2199] px-8 py-3 text-[16px] text-white md:px-12 md:py-6 md:text-[20px]"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading && <LoaderCircle className="mr-2 animate-spin" />} Yes
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountModal;
